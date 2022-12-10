import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { AlbumState } from '../../store/albums/album.state';
import { Store } from '@ngxs/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Photo } from '../../models/photo';
import { GetPhotos } from '../../store/albums/album.action';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent implements OnInit, OnDestroy {
  public photos$: Observable<Photo[]> = this.store.select(AlbumState.photos);
  public loading$: Observable<boolean> = this.store.select(
    AlbumState.loadingPhoto
  );
  public loaded$: Observable<boolean> = this.store.select(
    AlbumState.loadedPhoto
  );

  private id$!: Observable<string | null>;
  private subGuard$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      filter((param: ParamMap) => param.has('id')),
      map((param: ParamMap) => param.get('id'))
    );

    this.handleId();
  }

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }

  public goBackToList(): void {
    this.router.navigate(['albums']);
  }

  private handleId(): void {
    this.id$
      .pipe(filter(Boolean), takeUntil(this.subGuard$))
      .subscribe((id) => this.store.dispatch(new GetPhotos(+id)));
  }
}
