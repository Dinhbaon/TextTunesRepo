import { Component, Input, OnInit } from '@angular/core';
import { SearchContent } from 'spotify-types';
import { GetTextService } from '../get-text/get-text.component.service';

@Component({
  selector: 'app-recommendation-results',
  templateUrl: './recommendation-results.component.html',
  styleUrls: ['./recommendation-results.component.css']
})
export class RecommendationResultsComponent implements OnInit {

  private _loading: boolean = true; 
  private _data: SearchContent[] = []
  constructor(private _GetTextService : GetTextService) {

  }
  ngOnInit(): void {
    this.HandleRecommendations()

  }

  HandleRecommendations() {
    this._GetTextService.searchContentArr.subscribe((recommendationsResults:SearchContent[]) => {
      console.log(recommendationsResults)
      this._data = recommendationsResults
      this._loading = false; 
    })
  }



  get songNames() : string[]{
    console.log(this._data.map((song) => song.tracks!.items[0].name))
    return this._data.map((song) => song.tracks!.items[0].name);
  }



  get artistName(): string[] {
    return this._data.map((song) => song.tracks!.items[0].artists[0].name);
  }

  get tracks(): SearchContent[] {
    this._data[0].tracks?.items[0].album.images[0].url
    return this._data
  }

  get loading(): boolean {
    return this._loading; 
  }


}
