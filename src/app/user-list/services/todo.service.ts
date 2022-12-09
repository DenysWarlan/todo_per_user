import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseNewTodo, Todo } from '../models/todo';

@Injectable()
export class TodoService {
  private url: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/todos?userId=${id}`);
  }

  public addNewTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<ResponseNewTodo>(`${this.url}/todos`, { todo })
      .pipe(map((res: ResponseNewTodo) => ({ ...res.todo, id: res.id })));
  }

  public editTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<ResponseNewTodo>(`${this.url}/todos/${todo.id}`, {
        todo,
      })
      .pipe(map((res: ResponseNewTodo) => ({ ...res.todo, id: res.id })));
  }
}
