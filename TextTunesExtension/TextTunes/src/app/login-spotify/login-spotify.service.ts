import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable  } from "rxjs";
import { AccessToken } from "spotify-types";
type AuthToken = {

    access_token : string 
    token_type : string 
    scope : string 
    expires_in : number
    refresh_token : string

}

@Injectable({
    providedIn: 'root'
  })
export class LoginSpotifyStore {


    clientID = "8be7fdaeed0440d48b532a93548268ab"; 

    clientSecret = "6f2f4b3c50984ee2a5b859bfaf21942a"

    responseType = encodeURIComponent('code');

    redirectURI = encodeURIComponent('https://glbfefeehhfjbemiiogccdnbeafnfjhg.chromiumapp.org/');

    scope = encodeURIComponent('user-read-private, user-read-email, user-top-read');

    showDialog = encodeURIComponent('true');

    state = '';

    accessToken = ''; 

    refreshToken = ''; 

    code = '';

    userSignedIn = false; 

    loading = true; 

    constructor(public httpClient : HttpClient) { }

    public getSpotifyAuthURL() {
        this.state = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15))

        let oauthURL = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=${this.responseType}&redirect_uri=${this.redirectURI}&state=${this.state}&scope=${this.scope}&show_dialog=${this.showDialog}`


        return oauthURL
    }

    public callback(code : string, redirect_uri : string) {
        let httpParams = new HttpParams()
        .append("code", code)
        .append("grant_type", "authorization_code")
        .append("redirect_uri", redirect_uri)

        return this.httpClient.post<AuthToken>("https://accounts.spotify.com/api/token", httpParams.toString(), 
        { headers: {
            'Content-Type':'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + window.btoa(`${this.clientID}:${this.clientSecret}`)
        }})
    }

    public refreshAccessToken(refreshToken : string) : Observable<AccessToken>{

        let httpParams = new HttpParams()
        .append("grant_type", "refresh_token")
        .append("refresh_token", refreshToken);

        
        return this.httpClient.post<AccessToken>("https://accounts.spotify.com/api/token", httpParams.toString(), 
        { headers: { 
          'Content-Type':'application/x-www-form-urlencoded', 
          'Authorization': 'Basic ' + window.btoa(`${this.clientID}:${this.clientSecret}`)
        },})

        
    }

    public getAccessToken() : string {
        return this.accessToken; 
    }

    public getRefreshToken() : string {
        return this.refreshToken; 
    }

    public setAccessToken(accessToken : string) {
        this.accessToken = accessToken
    }

    public setRefreshToken(refreshToken : string ) {
        this.refreshToken = refreshToken
    }

    public setCode(redirectURL : string) {
        this.code= redirectURL!.substring(redirectURL!.indexOf('code=') + 5);
        this.code = this.code.substring(0, this.code.indexOf('&'));
    }
    
}