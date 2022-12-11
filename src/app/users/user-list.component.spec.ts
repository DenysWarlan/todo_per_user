import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MaterialModule } from '../material.module';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_MOCK, ROUTER_MOCK } from '@mocks/router.mock';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NEW_USER_MOCK, USER_MOCK } from '@mocks/user.mock';
import { FormUserComponent } from '@app/users/components/form-user/form-user.component';
import { User } from '@app/users/models/user';
import { AddNewUser, EditUser } from '@store/users/user.actions';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let storeMock: Store;
  let router = ROUTER_MOCK;
  let paramMapMock = PARAM_MOCK;
  const sizeDialog: { width: string; height: string } = {
    height: '500px',
    width: '400px',
  };
  let dialogMock: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [MockModule(MaterialModule)],
      providers: [
        MockProvider(Store, {
          select: (value: any) => of(value),
        }),
        {
          provide: ActivatedRoute,
          useValue: paramMapMock,
        },

        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(Store);
    dialogMock = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to user list', () => {
    component.goToDetails(1);

    expect(router.navigate).toHaveBeenCalledWith([`user/1`]);
  });

  it('should back to user list', () => {
    component.goToTasks(1);

    expect(router.navigate).toHaveBeenCalledWith([`user/1/tasks`]);
  });

  describe('should test dialog for edit user data', () => {
    beforeEach(() => {
      spyOn(storeMock, 'dispatch');
    });

    it('should open dialog', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<typeof FormUserComponent>);
      const editedUser: User = USER_MOCK;

      component.onEditUser(editedUser);

      expect(dialogMock.open).toHaveBeenCalledWith(FormUserComponent, {
        ...sizeDialog,
        data: { user: editedUser },
      });
    });

    it('should not dispatch edit action after close, when submit data', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<typeof FormUserComponent>);
      const editedUser: User = USER_MOCK;

      component.onEditUser(editedUser);

      expect(storeMock.dispatch).not.toHaveBeenCalledWith(
        new EditUser(editedUser)
      );
    });

    it('should dispatch edit action after close, when submit data', () => {
      const editedUser: User = USER_MOCK;
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(editedUser),
      } as MatDialogRef<typeof FormUserComponent>);

      component.onEditUser(editedUser);

      expect(storeMock.dispatch).toHaveBeenCalledWith(new EditUser(editedUser));
    });
  });

  describe('should test dialog for add new user', () => {
    beforeEach(() => {
      spyOn(storeMock, 'dispatch');
    });

    it('should open dialog', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<typeof FormUserComponent>);

      component.onAddUser();

      expect(dialogMock.open).toHaveBeenCalledWith(FormUserComponent, {
        ...sizeDialog,
      });
    });

    it('should not dispatch add new user action after close, when submit data', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<typeof FormUserComponent>);
      const newUser: User = NEW_USER_MOCK;

      component.onAddUser();

      expect(storeMock.dispatch).not.toHaveBeenCalledWith(
        new AddNewUser(newUser)
      );
    });

    it('should dispatch add new user action after close, when submit data', () => {
      const newUser: User = NEW_USER_MOCK;
      spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: () => of(newUser),
      } as MatDialogRef<typeof FormUserComponent>);

      component.onAddUser();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new AddNewUser(newUser));
    });
  });
});
