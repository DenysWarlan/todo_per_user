import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AlbumState } from './store/albums/album.state';
import { Album } from './models/album';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent {
  public albums$: Observable<Album[]> = this.store.select(AlbumState.albums);
  public loading$: Observable<boolean> = this.store.select(AlbumState.loading);
  public loaded$: Observable<boolean> = this.store.select(AlbumState.loaded);

  constructor(private store: Store, private router: Router) {}

  public goToPhoto(id: number): void {
    this.router.navigate([`album/${id}`]);
  }
}
