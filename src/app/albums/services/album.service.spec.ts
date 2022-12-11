import { AlbumService } from './album.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ALBUMS_MOCK } from '@mocks/album.mock';
import { PHOTOS_MOCK } from '@mocks/photo.mock';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

describe('AlbumService', () => {
  let injector: TestBed;
  let service: AlbumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });

    injector = getTestBed();
    service = injector.get(AlbumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return array, when get albums', () => {
    service.getAlbums().subscribe((res: Album[]) => {
      expect(res).toEqual(ALBUMS_MOCK);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/albums'
    );
    expect(req.request.method).toBe('GET');
    req.flush(ALBUMS_MOCK);
  });

  it('should return array, when get photos', () => {
    service.getPhotos(1).subscribe((res: Photo[]) => {
      expect(res).toEqual(PHOTOS_MOCK);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/photos?albumId=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(PHOTOS_MOCK);
  });
});
