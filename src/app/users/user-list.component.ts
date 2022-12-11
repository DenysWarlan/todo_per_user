import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from './models/user';
import { filter, Observable, take } from 'rxjs';
import { FormUserComponent } from './components/form-user/form-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserState } from '@store/users/user.state';
import { AddNewUser, EditUser } from '@store/users/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public users$: Observable<User[]> = this.store.select(UserState.users);
  public loading$: Observable<boolean> = this.store.select(UserState.loading);
  public loaded$: Observable<boolean> = this.store.select(UserState.loaded);
  public displayedColumns: string[] = [
    'name',
    'username',
    'email',
    'phone',
    'action',
  ];

  private sizeDialog: { width: string; height: string } = {
    height: '500px',
    width: '400px',
  };
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private route: Router
  ) {}

  public onEditUser(user: User): void {
    this.dialog
      .open(FormUserComponent, {
        ...this.sizeDialog,
        data: { user },
      })
      .afterClosed()
      .pipe(filter(Boolean), take(1))
      .subscribe((result: User) => this.store.dispatch(new EditUser(result)));
  }

  public onAddUser(): void {
    this.dialog
      .open(FormUserComponent, {
        ...this.sizeDialog,
      })
      .afterClosed()
      .pipe(filter(Boolean), take(1))
      .subscribe((result: User) => this.store.dispatch(new AddNewUser(result)));
  }

  public goToDetails(id: number): void {
    this.route.navigate([`user/${id}`]);
  }

  public goToTasks(id: number): void {
    this.route.navigate([`user/${id}/tasks`]);
  }
}
