import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';

import { Task } from '../../models/task';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetTasks } from '@store/tasks/task.actions';
import { TaskState } from '@store/tasks/task.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  public tasks$: Observable<Task[] | null> = this.store.select(TaskState.tasks);
  public loaded$: Observable<boolean | null> = this.store.select(
    TaskState.loaded
  );
  public loadedTask$: Observable<boolean> = this.store.select(
    TaskState.loadedTask
  );
  public isAddTask: boolean = false;
  public id$!: Observable<string | null>;
  public newTask!: Task;

  protected subGuard$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      filter((param: ParamMap) => param.has('id')),
      map((param: ParamMap) => param.get('id'))
    );

    this.handleLoadTask();
    this.handleId();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }

  public toggleAddTask(): void {
    this.isAddTask = !this.isAddTask;
  }

  public cancelAddTask(): void {
    this.isAddTask = false;
  }

  public goBackToList() {
    this.router.navigate(['users']);
  }

  public goBackToUserDetails(id: string) {
    this.router.navigate([`user/${id}`]);
  }

  private handleLoadTask() {
    this.loadedTask$
      .pipe(filter(Boolean), takeUntil(this.subGuard$))
      .subscribe(() => this.cancelAddTask());
  }

  private handleId(): void {
    this.id$
      .pipe(filter(Boolean), takeUntil(this.subGuard$))
      .subscribe((id: string) => {
        this.store.dispatch(new GetTasks(+id));
        this.newTask = {
          id: null,
          userId: +id,
          title: '',
          completed: false,
        };
      });
  }
}
