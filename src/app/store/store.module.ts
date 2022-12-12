import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from '@store/users/user.state';
import { TaskState } from '@store/tasks/task.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState, TaskState], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false,
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
