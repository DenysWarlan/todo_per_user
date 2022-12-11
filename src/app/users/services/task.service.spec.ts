import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from '@app/users/services/task.service';
import { NEW_TASK_MOCK, TASK_MOCK, TASKS_MOCK } from '@mocks/task.mock';
import { Task } from '@app/users/models/task';

describe('TaskService', () => {
  let injector: TestBed;
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    injector = getTestBed();
    service = injector.get(TaskService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return task array, when get task list', () => {
    service.getTasks(1).subscribe((res: Task[]) => {
      expect(res).toEqual(TASKS_MOCK);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/tasks?userId=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(TASKS_MOCK);
  });

  it('should return new task', () => {
    service
      .addNewTask(NEW_TASK_MOCK)
      .subscribe((res: Task) =>
        expect(res).toEqual({ ...NEW_TASK_MOCK, id: 1 })
      );

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/tasks'
    );
    req.flush({ id: 1, task: NEW_TASK_MOCK });
    expect(req.request.method).toBe('POST');
  });

  it('should return edited user', () => {
    const editedTask: Task = {
      ...TASK_MOCK,
      title: 'Test',
    };
    service
      .editTask(editedTask)
      .subscribe((res: Task) => expect(res).toEqual(editedTask));

    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/tasks/${editedTask.id}`
    );
    req.flush({ id: editedTask.id, task: editedTask });
    expect(req.request.method).toBe('PUT');
  });
});
