import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Todo } from '../../models/todo';
import {
  AddNewTodo,
  EditTodo,
  ToggleTodo,
} from '../../store/todos/todo.actions';
import { TodoState } from '../../store/todos/todo.state';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() set todo(todo: Todo) {
    this.titleControl.patchValue(todo.title);
    this._todo = todo;
  }
  get todo(): Todo {
    return this._todo;
  }
  @Input() public isEditTask: boolean = false;

  public titleControl: FormControl<string | null> = new FormControl<string>(
    '',
    [Validators.required, Validators.min(5)]
  );
  public loadedTask$: Observable<boolean> = this.store.select(
    TodoState.loadedTask
  );
  public loadingTask$: Observable<boolean> = this.store.select(
    TodoState.loadingTask
  );

  private _todo!: Todo;
  protected subGuard$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.handleLoadTask();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }
  public toggleComplete(): void {
    const todo: Todo = { ...this._todo, completed: !this._todo.completed };
    this.store.dispatch(new ToggleTodo(todo));
  }

  public editTask(): void {
    this.isEditTask = true;
  }

  public submitEdit(): void {
    const todo: Todo = { ...this._todo, title: this.titleControl.value };
    console.log(this._todo);
    this.store.dispatch(
      !!this._todo?.id ? new EditTodo(todo) : new AddNewTodo(todo)
    );
  }

  public cancelEdit(): void {
    this.isEditTask = false;
  }

  private handleLoadTask() {
    this.loadedTask$.pipe(takeUntil(this.subGuard$)).subscribe(() => {
      this.isEditTask = false;
    });
  }
}
