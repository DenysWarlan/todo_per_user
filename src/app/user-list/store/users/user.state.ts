import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AddNewUser,
  AddNewUserFailure,
  AddNewUserSuccess,
  EditUser,
  EditUserFailure,
  EditUserSuccess,
  GetUserDetails,
  GetUserDetailsFailure,
  GetUserDetailsSuccess,
  GetUsers,
  GetUsersFailure,
  GetUsersSuccess,
} from './user.actions';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

export interface UsersStateModel {
  users: User[];
  user: User | null;
  favorites: number[];
  error: HttpErrorResponse | null;
  loaded: boolean;
  loading: boolean;
}

const defaults: UsersStateModel = {
  users: [],
  user: null,
  error: null,
  loaded: false,
  loading: false,
  favorites: [],
};

@State<UsersStateModel>({
  defaults,
  name: 'users',
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Action(GetUsers)
  public getUsers({
    dispatch,
    patchState,
  }: StateContext<UsersStateModel>): Observable<void | Observable<void>> {
    patchState({
      loading: true,
    });

    return this.userService.getUsers().pipe(
      map((payload: User[]) => dispatch(new GetUsersSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetUsersFailure(error))
      )
    );
  }

  @Action(GetUsersSuccess)
  public getUsersSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: GetUsersSuccess
  ): void {
    patchState({
      loading: false,
      loaded: true,
      users: payload,
      error: null,
    });
  }

  @Action(GetUsersFailure)
  public getUsersFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUsersFailure
  ): void {
    patchState({
      loading: false,
      loaded: true,
      users: [],
      error: payload,
    });
  }

  @Action(GetUserDetails)
  public getUserDetails(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetails
  ): Observable<void | Observable<void>> {
    return this.userService.getUserDetails(payload).pipe(
      map((payload: User) => dispatch(new GetUserDetailsSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetUserDetailsFailure(error))
      )
    );
  }

  @Action(GetUserDetailsSuccess)
  public getUserDetailsSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetailsSuccess
  ): void {
    patchState({
      user: payload,
      error: null,
    });
  }

  @Action(GetUserDetailsFailure)
  public getUserDetailsFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetailsFailure
  ): void {
    patchState({
      user: null,
      error: payload,
    });
  }

  @Action(AddNewUser)
  public addNewUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewUser
  ): Observable<void | Observable<void>> {
    return this.userService.addNewUser(payload).pipe(
      map((payload: User) => dispatch(new AddNewUserSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new AddNewUserFailure(error))
      )
    );
  }

  @Action(AddNewUserSuccess)
  public addNewUserSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: AddNewUserSuccess
  ): void {
    const users: User[] = [...getState().users, payload];

    patchState({
      users,
      error: null,
    });
  }

  @Action(AddNewUserFailure)
  public addNewUserFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewUserFailure
  ): void {
    patchState({
      user: null,
      error: payload,
    });
  }

  @Action(EditUser)
  public editUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewUser
  ): Observable<void | Observable<void>> {
    return this.userService.editUser(payload).pipe(
      map((payload: User) => dispatch(new EditUserSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new EditUserFailure(error))
      )
    );
  }

  @Action(EditUserSuccess)
  public editUserSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: EditUserSuccess
  ): void {
    const users: User[] = getState().users.map((user: User) =>
      user.id === payload.id ? payload : user
    );

    console.log(users);

    patchState({
      users,
      error: null,
    });
  }

  @Action(EditUserFailure)
  public editUserFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: EditUserFailure
  ): void {
    patchState({
      user: null,
      error: payload,
    });
  }

  @Selector()
  public static loaded({ loaded }: UsersStateModel): boolean {
    return loaded;
  }

  @Selector()
  public static loading({ loading }: UsersStateModel): boolean {
    return loading;
  }

  @Selector()
  public static users({ users }: UsersStateModel): User[] {
    return !!users?.length ? users : ([] as User[]);
  }

  @Selector()
  public static user({ user }: UsersStateModel): User | null {
    return user;
  }
}
