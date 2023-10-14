import { Component } from '@angular/core';
import { LoginSpotifyStore } from './login-spotify/login-spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TextTunes';

  constructor(public tokenStore : LoginSpotifyStore) { }
}
