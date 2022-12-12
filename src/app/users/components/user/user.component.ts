import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../models/user';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { UserState } from '@store/users/user.state';
import { GetUserDetails } from '@store/users/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  public user$: Observable<User | null> = this.store.select(UserState.user);
  public id$!: Observable<string | null>;

  private subGuard$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      filter((param: ParamMap) => param.has('id')),
      map((param: ParamMap) => param.get('id'))
    );

    this.handleId();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }

  public goBackToList() {
    this.router.navigate(['users']);
  }

  public goToTaskList(id: string) {
    this.router.navigate([`user/${id}/tasks`]);
  }

  private handleId(): void {
    this.id$
      .pipe(filter(Boolean), takeUntil(this.subGuard$))
      .subscribe((id) => this.store.dispatch(new GetUserDetails(+id)));
  }
}
