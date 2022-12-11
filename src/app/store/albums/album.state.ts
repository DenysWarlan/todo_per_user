import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  GetAlbums,
  GetAlbumsFailure,
  GetAlbumsSuccess,
  GetPhotos,
  GetPhotosFailure,
  GetPhotosSuccess,
} from './album.action';
import { AlbumService } from '@app/albums/services/album.service';
import { Album } from '@app/albums/models/album';
import { Photo } from '@app/albums/models/photo';

export interface AlbumStateModel {
  albums: Album[];
  loaded: boolean;
  loading: boolean;
  photos: Photo[];
  loadedPhoto: boolean;
  loadingPhoto: boolean;
  error: HttpErrorResponse | null;
}

const defaults: AlbumStateModel = {
  albums: [],
  loaded: false,
  loading: false,
  photos: [],
  loadingPhoto: false,
  loadedPhoto: false,
  error: null,
};

@State<AlbumStateModel>({
  defaults,
  name: 'albums',
})
@Injectable()
export class AlbumState {
  constructor(private albumService: AlbumService) {}

  @Action(GetAlbums)
  public getUsers({
    dispatch,
    patchState,
  }: StateContext<AlbumStateModel>): Observable<void | Observable<void>> {
    patchState({
      loading: true,
    });

    return this.albumService.getAlbums().pipe(
      map((payload: Album[]) => dispatch(new GetAlbumsSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetAlbumsFailure(error))
      )
    );
  }

  @Action(GetAlbumsSuccess)
  public getAlbumsSuccess(
    { patchState, getState }: StateContext<AlbumStateModel>,
    { payload }: GetAlbumsSuccess
  ): void {
    patchState({
      albums: payload,
      loading: false,
      loaded: true,
      error: null,
    });
  }

  @Action(GetAlbumsFailure)
  public getAlbumsFailure(
    { patchState }: StateContext<AlbumStateModel>,
    { payload }: GetAlbumsFailure
  ): void {
    patchState({
      albums: [],
      loading: false,
      loaded: true,
      error: payload,
    });
  }

  @Action(GetPhotos)
  public getPhotos(
    { dispatch, patchState }: StateContext<AlbumStateModel>,
    { payload }: GetPhotos
  ): Observable<void | Observable<void>> {
    patchState({
      loadingPhoto: true,
    });

    return this.albumService.getPhotos(payload).pipe(
      map((payload: Photo[]) => dispatch(new GetPhotosSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetPhotosFailure(error))
      )
    );
  }

  @Action(GetPhotosSuccess)
  public getPhotosSuccess(
    { patchState, getState }: StateContext<AlbumStateModel>,
    { payload }: GetPhotosSuccess
  ): void {
    patchState({
      photos: payload,
      loadingPhoto: false,
      loadedPhoto: true,
      error: null,
    });
  }

  @Action(GetPhotosFailure)
  public getPhotosFailure(
    { patchState }: StateContext<AlbumStateModel>,
    { payload }: GetPhotosFailure
  ): void {
    patchState({
      photos: [],
      loadedPhoto: true,
      error: payload,
    });
  }

  @Selector()
  public static loaded({ loaded }: AlbumStateModel): boolean {
    return loaded;
  }

  @Selector()
  public static loading({ loading }: AlbumStateModel): boolean {
    return loading || false;
  }

  @Selector()
  public static albums({ albums }: AlbumStateModel): Album[] {
    return !!albums?.length ? albums : ([] as Album[]);
  }

  @Selector()
  public static photos({ photos }: AlbumStateModel): Photo[] {
    return !!photos?.length ? photos : ([] as Photo[]);
  }

  @Selector()
  public static loadedPhoto({ loadedPhoto }: AlbumStateModel): boolean {
    return loadedPhoto;
  }

  @Selector()
  public static loadingPhoto({ loadingPhoto }: AlbumStateModel): boolean {
    return loadingPhoto;
  }
}
