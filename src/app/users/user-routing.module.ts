import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './user-list.component';
import { TaskListComponent } from '@app/users/components/task-list/task-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/Tasks', component: TaskListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
