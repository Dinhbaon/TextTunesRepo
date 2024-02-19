// get-text.component.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { from, mergeMap } from 'rxjs';
import { Paging, SearchContent, Track } from 'spotify-types';
import { LoginSpotifyStore } from '../login-spotify/login-spotify.service';
import { GetTextService } from './get-text.component.service';
type SongData = {
  song_name: string, 
  artist_name: string, 
  strength: number
}


@Component({
  selector: 'GetTextComponent',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css']
})
export class GetTextComponent implements OnInit {

  @Output()
  getRecommendation: EventEmitter<any> = new EventEmitter<any>();; 

  constructor(
      private _GetTextService: GetTextService) { }

  ngOnInit(): void {
  }


  public async getSelectedText() {
    this._GetTextService.getSelectedText()
  }

  public async getAllText() {
    this._GetTextService.getAllText()
  }

  public async recommend() {
    this.getRecommendation.emit(true)
    this._GetTextService.recommend()
  }

  get selectedText() {
    return this._GetTextService.selectedText
  }

}


