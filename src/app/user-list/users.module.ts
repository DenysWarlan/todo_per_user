import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserComponent } from './components/user/user.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormUserComponent } from './components/form-user/form-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './components/todo/todo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    TodoListComponent,
    FormUserComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
  ],
  providers: [UserService, TodoService],
  exports: [UserRoutingModule],
})
export class UsersModule {}
