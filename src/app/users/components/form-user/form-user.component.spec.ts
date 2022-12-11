import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserComponent } from './form-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockModule } from 'ng-mocks';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NEW_USER_MOCK, USER_MOCK } from '@mocks/user.mock';
import { MaterialModule } from '@app/material.module';
import { User } from '@app/users/models/user';
import { of } from 'rxjs';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;
  let mockDialogRef: MatDialogRef<FormUserComponent>;
  const dialogMock = {
    close: (value: boolean | User) => of(value),
  };
  let MOCK_DATA = { user: USER_MOCK };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserComponent],
      imports: [MockModule(ReactiveFormsModule), MockModule(MaterialModule)],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MOCK_DATA,
        },
        FormBuilder,
      ],
    }).compileComponents();

    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false, when click close', () => {
    spyOn(mockDialogRef, 'close');

    component.onClose();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  describe('should test when edit user data', () => {
    it('should create from', () => {
      const { id, ...expected }: Partial<User> = USER_MOCK;

      expect(component.form.value).toEqual(expected);
    });

    it('should close dialog with user data, when click submit', () => {
      spyOn(mockDialogRef, 'close');

      component.onSubmit();

      expect(mockDialogRef.close).toHaveBeenCalledWith(USER_MOCK);
    });
  });

  describe('should test when create new user', () => {
    beforeEach(() => {
      MOCK_DATA = { user: {} as User };
      createComponent();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create from', () => {
      const expected: Partial<User> = {
        name: '',
        username: '',
        email: '',
        phone: '',
      };

      component.ngOnInit();

      expect(component.form.value).toEqual(expected);
    });

    it('should close dialog with user data, when click submit', () => {
      const { id, ...newUset } = NEW_USER_MOCK;
      component.form.patchValue(newUset);
      spyOn(mockDialogRef, 'close');

      component.onSubmit();

      expect(mockDialogRef.close).toHaveBeenCalledWith(newUset);
    });
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(FormUserComponent);
    mockDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }
});
