import { HttpErrorResponse } from '@angular/common/http';
import { Todo } from '../../models/todo';

export class GetTodos {
  public static readonly type: string = '[Todo] Get todo-list';

  constructor(public payload: number) {}
}

export class GetTodosSuccess {
  public static readonly type: string = '[Todos] Get todo-list success';

  constructor(public payload: Todo[]) {}
}

export class GetTodosFailure {
  public static readonly type: string = '[Todos] Get todo-list failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class AddNewTodo {
  public static readonly type: string = '[Todos] Add new todo';

  constructor(public payload: Todo) {}
}

export class AddNewTodoSuccess {
  public static readonly type: string = '[Todos] Add new todo success';

  constructor(public payload: Todo) {}
}

export class AddNewTodoFailure {
  public static readonly type: string = '[Todos] Add new todo failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class EditTodo {
  public static readonly type: string = '[Todos] Edit todo';

  constructor(public payload: Todo) {}
}

export class EditTodoSuccess {
  public static readonly type: string = '[Todos] Edit todo success';

  constructor(public payload: Todo) {}
}

export class EditTodoFailure {
  public static readonly type: string = '[Todos] Edit todo failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class ToggleTodo{
  public static readonly type: string = '[Todos] Edit todo failure';

  constructor(public payload: Todo) {}
}
