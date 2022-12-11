import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListComponent } from './album-list.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MaterialModule } from '../material.module';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AlbumState } from '@store/albums/album.state';
import { Album } from './models/album';
import { PARAM_MOCK, ROUTER_MOCK } from '@mocks/router.mock';
import { ALBUMS_MOCK } from '@mocks/album.mock';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let storeMock: Store;
  let fixture: ComponentFixture<AlbumListComponent>;
  let router = ROUTER_MOCK;
  let paramMapMock = PARAM_MOCK;
  const mockAlbums: Album[] = ALBUMS_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumListComponent],
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
    Object.defineProperty(AlbumState, 'albums', { value: mockAlbums });
    Object.defineProperty(AlbumState, 'loading', { value: false });
    Object.defineProperty(AlbumState, 'loaded', { value: true });

    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test component', () => {
    it('should route navigate, when click button', () => {
      component.goToPhoto(1);

      expect(router.navigate).toHaveBeenCalledWith([`album/1`]);
    });
  });

  describe('tests template', () => {
    it('should showed album list, when loaded data', () => {
      const cards: DebugElement = fixture.debugElement.query(By.css('#albums'));

      expect(cards).toBeTruthy();
    });

    it('should routes to photo, when click btn show photo', () => {
      spyOn(component, 'goToPhoto');
      const btn: HTMLButtonElement =
        fixture.nativeElement.querySelector('#showPhotoList');

      btn.click();

      expect(component.goToPhoto).toHaveBeenCalledWith(1);
    });

    it('should album no data info, when loaded data and no data', () => {
      Object.defineProperty(AlbumState, 'albums', { value: [] });
      createComponent();
      const noData: DebugElement = fixture.debugElement.query(
        By.css('#noData')
      );

      expect(noData).toBeTruthy();
    });

    it('should showed spinner, when loading data', () => {
      Object.defineProperty(AlbumState, 'loading', { value: true });
      createComponent();
      const spinner: DebugElement = fixture.debugElement.query(
        By.css('#spinner')
      );

      expect(spinner).toBeTruthy();
    });
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
