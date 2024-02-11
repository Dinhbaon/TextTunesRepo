import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable  } from "rxjs";
import { LoginSpotifyStore } from "./login-spotify/login-spotify.service";
import { PublicUser } from "spotify-types";


@Injectable({
    providedIn: 'root'
  })
export class userDataSpotifyService {

    constructor(public tokenStore : LoginSpotifyStore, private httpClient : HttpClient) {
        
        let header = { headers : new HttpHeaders().set('Authorization', `Bearer ${this.tokenStore.getAccessToken()}`)}

        this.userData$ = this.httpClient.get<PublicUser>("https://api.spotify.com/v1/me", header)

        let userSongDataFetch$ = this.httpClient.get

    }

    userData$ : Observable<PublicUser>; 

    userName : string = '';
    
    userData : PublicUser | undefined= undefined; 

    profileImageURL : string | undefined = ''; 

    

}