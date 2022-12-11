import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '@app/users/models/task';

export class GetTasks {
  public static readonly type: string = '[Task] Get task-list';

  constructor(public payload: number) {}
}

export class GetTasksSuccess {
  public static readonly type: string = '[Tasks] Get task-list success';

  constructor(public payload: Task[]) {}
}

export class GetTasksFailure {
  public static readonly type: string = '[Tasks] Get task-list failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class AddNewTask {
  public static readonly type: string = '[Tasks] Add new task';

  constructor(public payload: Task) {}
}

export class AddNewTaskSuccess {
  public static readonly type: string = '[Tasks] Add new task success';

  constructor(public payload: Task) {}
}

export class AddNewTaskFailure {
  public static readonly type: string = '[Tasks] Add new task failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class EditTask {
  public static readonly type: string = '[Tasks] Edit task';

  constructor(public payload: Task) {}
}

export class EditTaskSuccess {
  public static readonly type: string = '[Tasks] Edit task success';

  constructor(public payload: Task) {}
}

export class EditTaskFailure {
  public static readonly type: string = '[Tasks] Edit task failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class ToggleTask {
  public static readonly type: string = '[Tasks] Edit task failure';

  constructor(public payload: Task) {}
}
