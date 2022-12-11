import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseNewTask, Task } from '../models/task';

@Injectable()
export class TaskService {
  private url: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getTasks(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks?userId=${id}`);
  }

  public addNewTask(task: Task): Observable<Task> {
    return this.http
      .post<ResponseNewTask>(`${this.url}/tasks`, { task })
      .pipe(map((res: ResponseNewTask) => ({ ...res.task, id: res.id })));
  }

  public editTask(task: Task): Observable<Task> {
    return this.http
      .put<ResponseNewTask>(`${this.url}/tasks/${task.id}`, {
        task,
      })
      .pipe(map((res: ResponseNewTask) => ({ ...res.task, id: res.id })));
  }
}
