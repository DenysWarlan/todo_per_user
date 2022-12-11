import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Task } from '../../models/task';
import { AddNewTask, EditTask, ToggleTask } from '@store/tasks/task.actions';
import { filter, Observable, Subject, take } from 'rxjs';
import { TaskState } from '@store/tasks/task.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnDestroy {
  @Input() public set task(task: Task) {
    this.titleControl.patchValue(task.title);
    this._task = task;
  }
  public get task(): Task {
    return this._task;
  }
  @Input() public isEditTask!: boolean;
  @Output() public isCancelAddingNewTask: EventEmitter<boolean> =
    new EventEmitter();

  public titleControl: FormControl<string | null> = new FormControl<string>(
    '',
    [Validators.required, Validators.min(5)]
  );
  public loadedTask$: Observable<boolean> = this.store.select(
    TaskState.loadedTask
  );
  public loadingTask$: Observable<boolean> = this.store.select(
    TaskState.loadingTask
  );

  private _task!: Task;
  protected subGuard$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {}

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }
  public toggleComplete(): void {
    const task: Task = { ...this._task, completed: !this._task.completed };
    this.store.dispatch(new ToggleTask(task));
  }

  public editTask(): void {
    this.isEditTask = true;
  }

  public submitEdit(): void {
    const task: Task = { ...this._task, title: this.titleControl.value };
    this.store.dispatch(
      !!this._task?.id ? new EditTask(task) : new AddNewTask(task)
    );
    this.handleLoadTask();
  }

  public cancelEdit(): void {
    this.isEditTask = false;
    this.titleControl.reset();

    if (!this._task.id) {
      this.isCancelAddingNewTask.emit(true);
    }
  }

  private handleLoadTask() {
    this.loadedTask$.pipe(filter(Boolean), take(1)).subscribe(() => {
      this.isEditTask = false;
    });
  }
}
