import { AlbumService } from './album.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

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
    service.getAlbums().subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should return array, when get albums', () => {
    service.getPhotos(1).subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/photos?albumId=1');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
