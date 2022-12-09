import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from './user-list/store/users/user.state';
import { TodoState } from './user-list/store/todos/todo.state';
import {AlbumState} from "./albums/store/albums/album.state";

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState, TodoState, AlbumState], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: true,
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
