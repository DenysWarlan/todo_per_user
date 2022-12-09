import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { AlbumListComponent } from './album-list.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumService } from './services/album.service';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [AlbumListComponent, PhotoListComponent],
  imports: [CommonModule, AlbumsRoutingModule, MaterialModule],
  exports: [AlbumsRoutingModule],
  providers: [AlbumService],
})
export class AlbumsModule {}
