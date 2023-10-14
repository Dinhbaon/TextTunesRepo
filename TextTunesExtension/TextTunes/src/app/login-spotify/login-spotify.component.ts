import { Component, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { LoginSpotifyStore  } from './login-spotify.service';

@Component({
  selector: 'SpotifyLoginComponent',
  templateUrl: './login-spotify.component.html',
  styleUrls: ['./login-spotify.component.css']
})
export class SpotifyLoginComponent {
  @ViewChild('SpotifyLoginComponent')
  SpotifyLoginComponent!: TemplateRef<any>;

  callbackURI = chrome.identity.getRedirectURL() 

  constructor(public tokenStore : LoginSpotifyStore, private ngZone : NgZone) { }



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
                      this.tokenStore.accessToken = redirect_url!.substring(redirect_url!.indexOf('access_token=') + 13);
                      this.tokenStore.accessToken = this.tokenStore.accessToken.substring(0, this.tokenStore.accessToken.indexOf('&'));
                      let state = redirect_url!.substring(redirect_url!.indexOf('state=') + 6);
          
                      // if (state === this.tokenStore.state) {
                          console.log("SUCCESS")
                          this.tokenStore.userSignedIn = true
                          chrome.storage.local.set({"access-token" : this.tokenStore.accessToken}, () => {console.log("token is set" + this.tokenStore.accessToken)})
          
                          chrome.storage.local.get(function(result){console.log(result)})
                          setTimeout(() => {
                            this.tokenStore.accessToken = '';
                            this.tokenStore.userSignedIn = false
                          }, 3600000);


          
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


