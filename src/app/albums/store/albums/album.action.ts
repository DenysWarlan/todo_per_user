import { HttpErrorResponse } from '@angular/common/http';
import { Album } from '../../models/album';
import { Photo } from '../../models/photo';

export class GetAlbums {
  public static readonly type: string = '[Albums] Get albums';
}

export class GetAlbumsSuccess {
  public static readonly type: string = '[Albums] Get albums success';

  constructor(public payload: Album[]) {}
}

export class GetAlbumsFailure {
  public static readonly type: string = '[Albums] Get albums failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class GetPhotos {
  public static readonly type: string = '[Albums] Get photos';
  constructor(public payload: number) {}
}

export class GetPhotosSuccess {
  public static readonly type: string = '[Albums] Get photos success';

  constructor(public payload: Photo[]) {}
}

export class GetPhotosFailure {
  public static readonly type: string = '[Albums] Get photos failure';

  constructor(public payload: HttpErrorResponse) {}
}
