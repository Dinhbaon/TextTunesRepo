import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable  } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class LoginSpotifyStore {


    clientID = "8be7fdaeed0440d48b532a93548268ab"; 

    responseType = encodeURIComponent('token');

    redirectURI = encodeURIComponent('https://glbfefeehhfjbemiiogccdnbeafnfjhg.chromiumapp.org/');

    scope = encodeURIComponent('user-read-private, user-read-email, user-top-read');

    showDialog = encodeURIComponent('true');

    state = '';

    accessToken = ''; 

    userSignedIn = false; 



    public getSpotifyAuthURL() {
        this.state = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15))

        let oauthURL = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=${this.responseType}&redirect_uri=${this.redirectURI}&state=${this.state}&scope=${this.scope}&show_dialog=${this.showDialog}`

        console.log(oauthURL)

        return oauthURL
    }


  


    
}