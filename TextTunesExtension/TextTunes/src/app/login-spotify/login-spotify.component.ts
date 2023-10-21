import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginSpotifyStore  } from './login-spotify.service';
import { AccessToken } from 'spotify-types';

@Component({
  selector: 'SpotifyLoginComponent',
  templateUrl: './login-spotify.component.html',
  styleUrls: ['./login-spotify.component.css']
})
export class SpotifyLoginComponent implements OnInit {

  constructor(public tokenStore : LoginSpotifyStore, private ngZone : NgZone) {}


   ngOnInit() {

    chrome.storage.local.get('refresh-token', (result) => {
        if (typeof result['refresh-token'] === 'undefined') {
          this.tokenStore.userSignedIn == false
        } else {
            this.ngZone.run(() => {
              this.tokenStore.refreshAccessToken(result['refresh-token']).subscribe((accessToken : AccessToken) => {
              console.log(accessToken)
              this.tokenStore.setAccessToken(accessToken['access_token'])
              this.tokenStore.userSignedIn = true
            })
          }
        )
          


        }
      })

   }


  handleSpotifyLoginClick() {
        if (this.tokenStore.userSignedIn) {
            console.log("User is already signed in.");
        } else {
            // sign the user in with 
            chrome.identity.launchWebAuthFlow({
              url: this.tokenStore.getSpotifyAuthURL(),
              interactive: true
          },  (redirect_url) => {
            this.ngZone.run(() => {
              if (chrome.runtime.lastError) {
              } else {
                  if (redirect_url!.includes('callback?error=access_denied')) {
                  } else {
                    console.log("this is the redirect url"+ redirect_url)
                      // this.tokenStore.setAccessToken(redirect_url!)
                      // this.tokenStore.setRefreshToken(redirect_url!)
                      this.tokenStore.setCode(redirect_url!)
                      console.log(this.tokenStore.code)
                      let state = redirect_url!.substring(redirect_url!.indexOf('state=') + 6);


                      this.tokenStore.callback(this.tokenStore.code, "https://glbfefeehhfjbemiiogccdnbeafnfjhg.chromiumapp.org/").subscribe(
                        (data) =>{
                          console.log(data)
                          this.tokenStore.setAccessToken(data['access_token'])
                          this.tokenStore.setRefreshToken(data['refresh_token'])
                          chrome.storage.local.set({"refresh-token" : this.tokenStore.refreshToken}, () => {console.log("refresh token is set" + this.tokenStore.accessToken)})
                          this.tokenStore.userSignedIn = true
                        }
                      )
                      // if (state === this.tokenStore.state) {
                          // console.log("SUCCESS")


          
                          // chrome.browserAction.setPopup({ popup: './popup-signed-in.html' }, () => {
                          //     sendResponse({ message: 'success' });
                          // });
                      // } else {

                      // }
                  }
                }
            });
          })
        }
    }

  
}


