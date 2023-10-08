import { Component, TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'SpotifyLoginComponent',
  templateUrl: './login-spotify.component.html',
  styleUrls: ['./login-spotify.component.css']
})
export class SpotifyLoginComponent {
  @ViewChild('SpotifyLoginComponent')
  SpotifyLoginComponent!: TemplateRef<any>;

  handleSpotifyLoginClick() {
    
    fetch("http://localhost:8080/api/login").then((response) => response.text())
    .then(response => {
      chrome.tabs.create({url : response})
    })

  }
}
