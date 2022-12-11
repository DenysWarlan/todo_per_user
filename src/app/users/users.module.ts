import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskComponent } from './components/task/task.component';
import { MaterialModule } from '../material.module';
import { UserRoutingModule } from './user-routing.module';
import { TaskListComponent } from '@app/users/components/task-list/task-list.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    TaskListComponent,
    FormUserComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
  ],
  providers: [UserService, TaskService],
  exports: [UserRoutingModule],
})
export class UsersModule {}
