import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import {
  AddNewTodo,
  AddNewTodoFailure,
  AddNewTodoSuccess,
  EditTodo,
  EditTodoFailure,
  EditTodoSuccess,
  GetTodos,
  GetTodosFailure,
  GetTodosSuccess,
  ToggleTodo,
} from './todo.actions';

export interface UsersStateModel {
  todos: Todo[];
  favorites: number[];
  error: HttpErrorResponse | null;
  loaded: boolean;
  loading: boolean;
  loadedTask: boolean;
  loadingTask: boolean;
}

const defaults: UsersStateModel = {
  todos: [],
  error: null,
  loaded: false,
  loading: false,
  loadedTask: false,
  loadingTask: false,
  favorites: [],
};

@State<UsersStateModel>({
  defaults,
  name: 'todos',
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Action(GetTodos)
  public getUsers(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: GetTodos
  ): Observable<void | Observable<void>> {
    patchState({
      loading: true,
    });
    return this.todoService.getTodos(payload).pipe(
      map((payload: Todo[]) => dispatch(new GetTodosSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetTodosFailure(error))
      )
    );
  }

  @Action(GetTodosSuccess)
  public getTodosSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: GetTodosSuccess
  ): void {
    patchState({
      loading: false,
      loaded: true,
      todos: payload,
      error: null,
    });
  }

  @Action(GetTodosFailure)
  public getTodosFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetTodosFailure
  ): void {
    patchState({
      loading: false,
      loaded: true,
      todos: [],
      error: payload,
    });
  }

  @Action(AddNewTodo)
  public addNewUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewTodo
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
    });

    return this.todoService.addNewTodo(payload).pipe(
      map((payload: Todo) => dispatch(new AddNewTodoSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new AddNewTodoFailure(error))
      )
    );
  }

  @Action(AddNewTodoSuccess)
  public addNewTodoSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: AddNewTodoSuccess
  ): void {
    const todos: Todo[] = [...getState().todos, payload];

    patchState({
      loadingTask: false,
      loadedTask: true,
      todos,
      error: null,
    });
  }

  @Action(AddNewTodoFailure)
  public addNewTodoFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewTodoFailure
  ): void {
    patchState({
      loadingTask: false,
      loadedTask: true,
      error: payload,
    });
  }

  @Action(ToggleTodo)
  public toggleTodo(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: ToggleTodo
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
    });

    return this.todoService.editTodo(payload).pipe(
      map((payload: Todo) => dispatch(new EditTodoSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new EditTodoFailure(error))
      )
    );
  }

  @Action(EditTodo)
  public editUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: EditTodo
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
    });

    return this.todoService.editTodo(payload).pipe(
      map((payload: Todo) => dispatch(new EditTodoSuccess(payload))),
      catchError((error: HttpErrorResponse) => {
        return dispatch(new EditTodoFailure(error));
      })
    );
  }

  @Action(EditTodoSuccess)
  public editTodoSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: EditTodoSuccess
  ): void {
    const todos: Todo[] = getState().todos.map((todo: Todo) =>
      todo.id === payload.id ? payload : todo
    );

    patchState({
      loadingTask: false,
      loadedTask: true,
      todos,
      error: null,
    });
  }

  @Action(EditTodoFailure)
  public editUserFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: EditTodoFailure
  ): void {
    patchState({
      loadingTask: false,
      loadedTask: true,
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
  public static todos({ todos }: UsersStateModel): Todo[] {
    return !!todos?.length ? todos : ([] as Todo[]);
  }

  @Selector()
  public static loadingTask({ loadingTask }: UsersStateModel): boolean {
    return loadingTask;
  }

  @Selector()
  public static loadedTask({ loadedTask }: UsersStateModel): boolean {
    return loadedTask;
  }
}
