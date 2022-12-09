import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListComponent },
  { path: 'album/:id', component: PhotoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule {}
