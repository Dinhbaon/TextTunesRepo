import { Component } from '@angular/core';
import { userDataSpotifyService } from '../userDataSpotify.service';


@Component({
  selector: 'UserDataComponent',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  constructor(public userData : userDataSpotifyService) { }
}
