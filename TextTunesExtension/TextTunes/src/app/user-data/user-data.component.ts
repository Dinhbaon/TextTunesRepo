import { Component } from '@angular/core';
import { userDataSpotifyService } from '../userDataSpotify.service';


@Component({
  selector: 'UserDataComponent',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  constructor(private _userData : userDataSpotifyService) { 
    console.log(this._userData.userDataDisplayName)
  }

  get displayName(): string | null | undefined {
    return this._userData.userDataDisplayName; 
  }

  get profilePicture() {
    return this._userData.userProfilePicture; 
  }

  get externalUrl() {
    return this._userData.externalUrl; 
  }

}
