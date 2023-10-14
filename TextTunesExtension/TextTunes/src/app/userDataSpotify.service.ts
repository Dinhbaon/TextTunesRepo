import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable  } from "rxjs";
import { LoginSpotifyStore } from "./login-spotify/login-spotify.service";


@Injectable({
    providedIn: 'root'
  })
export class userDataSpotifyService {

    constructor(public tokenStore : LoginSpotifyStore, private httpClient : HttpClient) {
        
        let header = { headers : new HttpHeaders().set('Authorization', `Bearer ${this.tokenStore.getAccessToken()}`)}

        let userDataFetch = this.httpClient.get<UserProfile>("https://api.spotify.com/v1/me", header)

        userDataFetch.subscribe((data : UserProfile) => {
            this.userData = data; 
            this.profileImageURL = data.images[0].url; 
        })
    }

    userName : string = '';
    
    userData : UserProfile | undefined= undefined; 

    profileImageURL : string | undefined = ''; 

    

}