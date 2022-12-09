import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { GetUserDetails } from '../../store/users/user.actions';
import { UserState } from '../../store/users/user.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  public user$: Observable<User | null> = this.store.select(UserState.user);

  private id!: string | null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.store.dispatch(new GetUserDetails(+this.id));
    }
  }

  public goBackToList() {
    this.router.navigate(['users']);
  }

  public goToTaskList() {
    this.router.navigate([`user/${this.id}/todos`]);
  }
}
