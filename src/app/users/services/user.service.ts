import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseNewUser, User } from '../models/user';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private url: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  public getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  public addNewUser(user: User): Observable<User> {
    return this.http
      .post<ResponseNewUser>(`${this.url}/users`, { user })
      .pipe(map((res: ResponseNewUser) => ({ ...res.user, id: res.id })));
  }

  public editUser(user: User): Observable<User> {
    return this.http
      .put<ResponseNewUser>(`${this.url}/users/${user.id}`, { user })
      .pipe(map((res: ResponseNewUser) => ({ ...res.user, id: res.id })));
  }
}
