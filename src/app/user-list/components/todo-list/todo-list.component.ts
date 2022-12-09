import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TodoState } from '../../store/todos/todo.state';
import { Todo } from '../../models/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetTodos } from '../../store/todos/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todos$: Observable<Todo[] | null> = this.store.select(TodoState.todos);
  public loaded$: Observable<boolean | null> = this.store.select(
    TodoState.loaded
  );
  public loadedTask$: Observable<boolean> = this.store.select(
    TodoState.loadedTask
  );
  public isAddTask: boolean = false;

  private id!: string | null;
  protected subGuard$: Subject<void> = new Subject<void>();
  public newTask!: Todo;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.handleLoadTask();

    if (this.id) {
      this.store.dispatch(new GetTodos(+this.id));
      this.newTask = {
        id: null,
        userId: +this.id,
        title: '',
        completed: false,
      };
    }
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }

  public onAddTodo(): void {
    this.isAddTask = true;
  }

  public goBackToList() {
    this.router.navigate(['users']);
  }

  public goBackToUserDetails() {
    this.router.navigate([`user/${this.id}`]);
  }

  private handleLoadTask() {
    this.loadedTask$.pipe(takeUntil(this.subGuard$)).subscribe(() => {
      this.isAddTask = false;
    });
  }
}
