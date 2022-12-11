import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/users/models/user';

export class GetUsers {
  public static readonly type: string = '[Users] Get users';
}

export class GetUsersSuccess {
  public static readonly type: string = '[Users] Get users success';

  constructor(public payload: User[]) {}
}

export class GetUsersFailure {
  public static readonly type: string = '[Users] Get users failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class GetUserDetails {
  public static readonly type: string = '[Users] Get user details';

  constructor(public payload: number) {}
}

export class GetUserDetailsSuccess {
  public static readonly type: string = '[Users] Get user details success';

  constructor(public payload: User) {}
}

export class GetUserDetailsFailure {
  public static readonly type: string = '[Users] Get user details failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class AddNewUser {
  public static readonly type: string = '[Users] Add new user';

  constructor(public payload: User) {}
}

export class AddNewUserSuccess {
  public static readonly type: string = '[Users] Add new user success';

  constructor(public payload: User) {}
}

export class AddNewUserFailure {
  public static readonly type: string = '[Users] Add new user failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class EditUser {
  public static readonly type: string = '[Users] Edit user';

  constructor(public payload: User) {}
}

export class EditUserSuccess {
  public static readonly type: string = '[Users] Edit user success';

  constructor(public payload: User) {}
}

export class EditUserFailure {
  public static readonly type: string = '[Users] Edit user failure';

  constructor(public payload: HttpErrorResponse) {}
}
