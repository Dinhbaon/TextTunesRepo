import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable  } from "rxjs";
import { LoginSpotifyStore } from "./login-spotify/login-spotify.service";
import { PublicUser } from "spotify-types";


@Injectable({
    providedIn: 'root'
  })
export class userDataSpotifyService {

    constructor(private _tokenStore : LoginSpotifyStore, private _httpClient : HttpClient) {
        
        let header = { headers : new HttpHeaders().set('Authorization', `Bearer ${this._tokenStore.getAccessToken()}`)}

        this._httpClient.get<PublicUser>("https://api.spotify.com/v1/me", header).subscribe((user : PublicUser) => {
            this._userData = user
        })


    }

    
    private _userData : PublicUser | undefined= undefined; 


    get userDataDisplayName(): string | null | undefined{
        return this._userData?.display_name; 
    }
    
    get userProfilePicture() :string | undefined {
        return this._userData?.images![0].url
    }

    get externalUrl(): string |undefined{
        return this._userData?.external_urls.spotify; 
    }

}