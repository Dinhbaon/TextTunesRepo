import { AfterContentInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { LoginSpotifyStore } from './login-spotify/login-spotify.service';
import { AccessToken } from 'spotify-types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TextTunes';
  private _selectedIndex = new FormControl(0);
  constructor(public tokenStore : LoginSpotifyStore, public ngZone : NgZone) { }


  ngOnInit() {

    chrome.storage.local.get('refresh-token', (result) => {
      if (typeof result['refresh-token'] === 'undefined') {
        this.ngZone.run(() => {
          this.tokenStore.userSignedIn == false
          this.tokenStore.loading = false
        }
        )

      } else {
          console.log('here')
          this.ngZone.run(() => {
            this.tokenStore.refreshAccessToken(result['refresh-token']).subscribe((accessToken : AccessToken) => {
            console.log(accessToken)
            this.tokenStore.setAccessToken(accessToken['access_token'])
            this.tokenStore.userSignedIn = true
            this.tokenStore.loading = false
          })
        }
      )
      }

    })
  }

  

  switchToRecommendationTab() {
    this._selectedIndex.setValue(1)
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

}
