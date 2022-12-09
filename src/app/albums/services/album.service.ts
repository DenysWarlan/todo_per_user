import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable()
export class AlbumService {
  private url: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/albums`);
  }
  public getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}/photos?albumId=${id}`);
  }
}
