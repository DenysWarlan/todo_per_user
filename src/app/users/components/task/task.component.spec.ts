import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@app/material.module';
import { TaskState } from '@store/tasks/task.state';
import { Store } from '@ngxs/store';
import { MockModule, MockProvider } from 'ng-mocks';
import { TaskComponent } from './task.component';
import { of } from 'rxjs';
import { NEW_TASK_MOCK } from '@mocks/task.mock';
import { AddNewTask, EditTask, ToggleTask } from '@store/tasks/task.actions';
import { Task } from '@app/users/models/task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let storeMock: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [MockModule(MaterialModule)],
      providers: [MockProvider(Store, { select: (value) => of(value) })],
    }).compileComponents();

    storeMock = TestBed.inject(Store);
    Object.defineProperty(TaskState, 'loadedTask', { value: true });
    Object.defineProperty(TaskState, 'loadingTask', { value: false });
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = NEW_TASK_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set task as complete', () => {
    spyOn(storeMock, 'dispatch');
    const action: ToggleTask = new ToggleTask({
      ...NEW_TASK_MOCK,
      completed: !NEW_TASK_MOCK.completed,
    });

    component.toggleComplete();

    expect(storeMock.dispatch).toHaveBeenCalledOnceWith(action);
  });

  it('should set task as incomplete', () => {
    spyOn(storeMock, 'dispatch');
    const mockTask: Task = {
      ...NEW_TASK_MOCK,
      completed: true,
    };
    component.task = mockTask;
    fixture.detectChanges();
    const action: ToggleTask = new ToggleTask({
      ...mockTask,
      completed: !mockTask.completed,
    });

    component.toggleComplete();

    expect(storeMock.dispatch).toHaveBeenCalledOnceWith(action);
  });

  it('should set edit task', () => {
    component.editTask();

    expect(component.isEditTask).toBeTruthy();
  });

  it('should cancel edit, when edit task', () => {
    component.titleControl.patchValue('trest');

    component.cancelEdit();

    expect(component.isEditTask).toBeFalsy();
    expect(component.titleControl.value).toBeNull();
  });

  it('should cancel edit, when add new task', () => {
    spyOn(component.isCancelAddingNewTask, 'emit');
    component.task = NEW_TASK_MOCK;
    component.titleControl.patchValue('trest');

    component.cancelEdit();

    expect(component.isEditTask).toBeFalsy();
    expect(component.titleControl.value).toBeNull();
    expect(component.isCancelAddingNewTask.emit).toHaveBeenCalledOnceWith(true);
  });

  it('should set edit task false, when task is loaded', () => {
    Object.defineProperty(TaskState, 'loadedTask', { value: true });
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = NEW_TASK_MOCK;
    fixture.detectChanges();

    expect(component.isEditTask).toBeFalsy();
  });

  it('should dispatch add new task, when submit task and task id 0', () => {
    spyOn(storeMock, 'dispatch');
    component.task = NEW_TASK_MOCK;
    fixture.detectChanges();

    component.submitEdit();

    expect(storeMock.dispatch).toHaveBeenCalledOnceWith(
      new AddNewTask(NEW_TASK_MOCK)
    );
  });

  it('should dispatch add new task, when submit task and task id not equal 0', () => {
    spyOn(storeMock, 'dispatch');
    component.task = { ...NEW_TASK_MOCK, id: 1 };
    component.titleControl.patchValue('trest');
    const editedTask: Task = {
      id: 1,
      title: 'trest',
      userId: 1,
      completed: false,
    };
    fixture.detectChanges();

    component.submitEdit();

    expect(storeMock.dispatch).toHaveBeenCalledOnceWith(
      new EditTask(editedTask)
    );
  });
});
