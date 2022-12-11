import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Task } from '@app/users/models/task';
import { TaskService } from '@app/users/services/task.service';
import {
  AddNewTask,
  AddNewTaskFailure,
  AddNewTaskSuccess,
  EditTask,
  EditTaskFailure,
  EditTaskSuccess,
  GetTasks,
  GetTasksFailure,
  GetTasksSuccess,
  ToggleTask,
} from '@store/tasks/task.actions';

export interface UsersStateModel {
  tasks: Task[];
  favorites: number[];
  error: HttpErrorResponse | null;
  loaded: boolean;
  loading: boolean;
  loadedTask: boolean;
  loadingTask: boolean;
}

const defaults: UsersStateModel = {
  tasks: [],
  error: null,
  loaded: false,
  loading: false,
  loadedTask: false,
  loadingTask: false,
  favorites: [],
};

@State<UsersStateModel>({
  defaults,
  name: 'task',
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Action(GetTasks)
  public getUsers(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: GetTasks
  ): Observable<void | Observable<void>> {
    patchState({
      loading: true,
      loadedTask: true,
    });
    return this.taskService.getTasks(payload).pipe(
      map((payload: Task[]) => dispatch(new GetTasksSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetTasksFailure(error))
      )
    );
  }

  @Action(GetTasksSuccess)
  public getTasksSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: GetTasksSuccess
  ): void {
    patchState({
      loading: false,
      loaded: true,
      loadingTask: false,
      loadedTask: true,
      tasks: payload,
      error: null,
    });
  }

  @Action(GetTasksFailure)
  public getTasksFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetTasksFailure
  ): void {
    patchState({
      loading: false,
      loaded: true,
      tasks: [],
      error: payload,
    });
  }

  @Action(AddNewTask)
  public addNewUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewTask
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
      loadedTask: false,
    });

    return this.taskService.addNewTask(payload).pipe(
      map((payload: Task) => dispatch(new AddNewTaskSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new AddNewTaskFailure(error))
      )
    );
  }

  @Action(AddNewTaskSuccess)
  public addNewTaskSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: AddNewTaskSuccess
  ): void {
    const tasks: Task[] = [...getState().tasks, payload];

    patchState({
      loadingTask: false,
      loadedTask: true,
      tasks,
      error: null,
    });
  }

  @Action(AddNewTaskFailure)
  public addNewTaskFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: AddNewTaskFailure
  ): void {
    patchState({
      loadingTask: false,
      loadedTask: true,
      error: payload,
    });
  }

  @Action(ToggleTask)
  public toggleTask(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: ToggleTask
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
    });

    return this.taskService.editTask(payload).pipe(
      map((payload: Task) => dispatch(new EditTaskSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new EditTaskFailure(error))
      )
    );
  }

  @Action(EditTask)
  public editUser(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: EditTask
  ): Observable<void | Observable<void>> {
    patchState({
      loadingTask: true,
      loadedTask: false,
    });

    return this.taskService.editTask(payload).pipe(
      map((payload: Task) => dispatch(new EditTaskSuccess(payload))),
      catchError((error: HttpErrorResponse) => {
        return dispatch(new EditTaskFailure(error));
      })
    );
  }

  @Action(EditTaskSuccess)
  public editTaskSuccess(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: EditTaskSuccess
  ): void {
    const tasks: Task[] = getState().tasks.map((task: Task) =>
      task.id === payload.id ? payload : task
    );

    patchState({
      loadingTask: false,
      loadedTask: true,
      tasks,
      error: null,
    });
  }

  @Action(EditTaskFailure)
  public editUserFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: EditTaskFailure
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
  public static tasks({ tasks }: UsersStateModel): Task[] {
    return !!tasks?.length ? tasks : ([] as Task[]);
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
