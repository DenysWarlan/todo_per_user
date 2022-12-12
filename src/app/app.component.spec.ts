import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MaterialModule } from '@app/material.module';
import { Store } from '@ngxs/store';
import { GetUsers } from '@store/users/user.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storeMock: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MockModule(MaterialModule), RouterTestingModule],
      providers: [MockProvider(Store)],
    }).compileComponents();
    storeMock = TestBed.inject(Store);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'xopero'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('xopero');
  });

  it('should get data', () => {
    spyOn(storeMock, 'dispatch');

    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalledWith([new GetUsers()]);
  });
});
