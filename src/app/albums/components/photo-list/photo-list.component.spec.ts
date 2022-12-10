import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { Store } from '@ngxs/store';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { GetPhotos } from '../../store/albums/album.action';
import { of } from 'rxjs';
import { AlbumState } from '../../store/albums/album.state';
import { Photo } from '../../models/photo';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let storeMock: Store;
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
  const mockPhotos: Photo[] = [
    {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
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
    Object.defineProperty(AlbumState, 'photos', { value: mockPhotos });
    Object.defineProperty(AlbumState, 'loadingPhoto', { value: false });
    Object.defineProperty(AlbumState, 'loadedPhoto', { value: true });

    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test component', () => {
    it('should get photo list', () => {
      spyOn(storeMock, 'dispatch');

      component.ngOnInit();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new GetPhotos(1));
    });

    it('should back to list', () => {
      component.goBackToList();
      expect(router.navigate).toHaveBeenCalledWith(['albums']);
    });
  });

  describe('tests template', () => {
    it('should showed button back to list', () => {
      const el: HTMLButtonElement =
        fixture.nativeElement.querySelector('#goBackToList');

      expect(el).toBeTruthy();
    });
    it('should showed photo list, when loaded data', () => {
      const cards: DebugElement = fixture.debugElement.query(By.css('#cards'));

      expect(cards).toBeTruthy();
    });
    it('should showed no data info, when loaded data and no data', () => {
      Object.defineProperty(AlbumState, 'photos', { value: [] });
      createComponent();

      const noData: DebugElement = fixture.debugElement.query(
        By.css('#noData')
      );

      expect(noData).toBeTruthy();
    });

    it('should showed spinner, when loading data', () => {
      Object.defineProperty(AlbumState, 'loadingPhoto', { value: true });
      createComponent();

      const spinner: DebugElement = fixture.debugElement.query(
        By.css('#spinner')
      );

      expect(spinner).toBeTruthy();
    });
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
