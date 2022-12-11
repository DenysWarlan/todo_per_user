import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MaterialModule } from '@app/material.module';
import { Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_MOCK, ROUTER_MOCK } from '@mocks/router.mock';
import { GetPhotos } from '@app/store/albums/album.action';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let storeMock: Store;
  let router = ROUTER_MOCK;
  let paramMapMock = PARAM_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [MockModule(MaterialModule), RouterTestingModule],
      providers: [
        MockProvider(Store),
        {
          provide: ActivatedRoute,
          useValue: paramMapMock,
        },

        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    storeMock = TestBed.inject(Store);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get photo list', () => {
    spyOn(storeMock, 'dispatch');

    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalledWith(new GetPhotos(1));
  });

  it('should back to user list', () => {
    component.goBackToList();

    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should go to task list', () => {
    component.goToTaskList('1');

    expect(router.navigate).toHaveBeenCalledWith(['user/1/tasks']);
  });
});
