import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {MockModule, MockProvider} from "ng-mocks";
import {MaterialModule} from "../material.module";
import {Store} from "@ngxs/store";
import {of} from "rxjs";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };
  let paramMapMock = {
    paramMap: of(
      convertToParamMap({
        id: '1',
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
