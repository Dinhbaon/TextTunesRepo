import { Component } from '@angular/core';
import { userDataSpotifyService } from '../userDataSpotify.service';


@Component({
  selector: 'GetTextComponent',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css']
})
export class GetTextComponent {

  constructor(public userData : userDataSpotifyService) { }

  selectedText : string = 'Type, Highlight or Select All Text on the page to get a song recommendation!'
}
