import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAlbums } from '@store/albums/album.action';
import { GetUsers } from '@store/users/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'xopero';
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch([new GetAlbums(), new GetUsers()]);
  }
}
