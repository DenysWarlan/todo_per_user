import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MaterialModule } from '@app/material.module';
import { Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskState } from '@store/tasks/task.state';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_MOCK, ROUTER_MOCK } from '@mocks/router.mock';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let router = ROUTER_MOCK;
  let paramMapMock = PARAM_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [MockModule(MaterialModule), RouterTestingModule],
      providers: [
        MockProvider(Store, { select: (value) => of(value) }),
        {
          provide: ActivatedRoute,
          useValue: paramMapMock,
        },

        { provide: Router, useValue: ROUTER_MOCK },
      ],
    }).compileComponents();

    Object.defineProperty(TaskState, 'loaded', { value: true });
    Object.defineProperty(TaskState, 'loadedTask', { value: false });
    Object.defineProperty(TaskState, 'tasks', { value: [] });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new tas', () => {
    expect(component.isAddTask).toBeFalsy();

    component.toggleAddTask();

    expect(component.isAddTask).toBeTruthy();
  });

  it('should back to user list', () => {
    component.goBackToList();

    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should back to user details', () => {
    component.goBackToUserDetails('1');

    expect(router.navigate).toHaveBeenCalledWith(['user/1']);
  });

  it('should cancel add new task', () => {
    component.cancelAddTask();

    expect(component.isAddTask).toBeFalsy();
  });

  it('should set isAddTask false, when task is loaded after submit', () => {
    Object.defineProperty(TaskState, 'loadedTask', { value: true });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isAddTask).toBeFalsy();
  });
});
