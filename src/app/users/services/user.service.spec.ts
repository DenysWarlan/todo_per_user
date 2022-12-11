import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from '@app/users/services/user.service';
import { NEW_USER_MOCK, USER_MOCK, USERS_MOCK } from '@mocks/user.mock';
import { User } from '@app/users/models/user';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return array, when get users', () => {
    service.getUsers().subscribe((res: User[]) => {
      expect(res).toEqual(USERS_MOCK);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  it('should return user details', () => {
    service.getUserDetails(1).subscribe((res: User) => {
      expect(res).toEqual(USER_MOCK);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(USER_MOCK);
  });

  it('should return new user', () => {
    service
      .addNewUser(NEW_USER_MOCK)
      .subscribe((res: User) => expect(res).toEqual(NEW_USER_MOCK));

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    req.flush({ id: 0, user: NEW_USER_MOCK });
    expect(req.request.method).toBe('POST');
  });

  it('should return edited user', () => {
    const editedUser: User = {
      ...USER_MOCK,
      name: 'Test',
    };
    service
      .editUser(editedUser)
      .subscribe((res: User) => expect(res).toEqual(editedUser));

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    req.flush({ id: editedUser.id, user: editedUser });
    expect(req.request.method).toBe('PUT');
  });
});
