import { Injectable, NgZone } from "@angular/core";
import { GetTextComponent } from "./get-text.component";
import { from, mergeMap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SearchContent } from "spotify-types";
import { LoginSpotifyStore } from "../login-spotify/login-spotify.service";

@Injectable({
    providedIn: 'root'
  })
export class GetTextService {


    private _selectedText : string = 'Type, Highlight or Select All Text on the page to get a song recommendation!'; 
    private _isGoogleDocs: boolean = false
    constructor(private ngZone : NgZone, 
        private httpClient: HttpClient, 
        private _tokenStore: LoginSpotifyStore) {

    }


    public setSelectedText(selectedText: string) {
        this._selectedText = selectedText;
        this.ngZone.run(() => { }); // Trigger manual change detection
      }
      private async getTabId() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab?.id;
      }
    
      private isGoogleDocs() {
        from(chrome.tabs.query({ active: true, currentWindow: true })).subscribe((tab) => {
          console.log(tab[0].url)
          if (!tab[0].url) {
            this._isGoogleDocs = false
          } else {
            this._isGoogleDocs = tab[0].url?.includes('https://docs.google.com/')
          }
        }
        );
    
    
      }
    
      public async getSelectedText() {
        const tabId = await this.getTabId();
    
        if (!tabId) {
          return; // Handle the case where there is no active tab
        }
    
    
    
        try {
          const result = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
              return getSelection()!.toString();
            },
          });
    
          const selectedText = result[0]['result'];
          console.log(selectedText);
          this.setSelectedText(selectedText)
        } catch (e) {
          console.error(e); // Log any potential errors
        }
      }
    
      public async getAllText() {
        const tabId = await this.getTabId();

        if (this._isGoogleDocs) {
        
        }
        
        if (!tabId) {
          return; // Handle the case where there is no active tab
        }
        
        try {
          const result = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
              let body = document.querySelector('body');
              const excludedTags = ['nav', 'header', 'footer', 'script', 'style', 'a', 'img'];
        
              if (document.querySelector('#content')) {
                body = document.querySelector('#content');
              }
              if (document.querySelector('.main')) {
                body = document.querySelector('.main') as HTMLBodyElement;
              }
        
              if (document.querySelector('.topic-content')) {
                body = document.querySelector('.topic-content')
              }
        
              const allTags = body!.querySelectorAll('*');
        
              let visibleText = [];
              let nChars = 0;
              const maxChars = 10000;
        
              for (let i = 0, max = allTags.length; i < max; i++) {
                const elem = allTags[i];
        
                // Exclude specific tags and their children
                if (
                  excludedTags.includes(elem.tagName.toLowerCase()) ||
                  excludedTags.some(excludedTag => elem.matches(excludedTag) || elem.closest(excludedTag))
                ) {
                  continue;
                }
        
                const style = window.getComputedStyle(elem);
                const isHidden = style.display === 'none' || style.visibility === 'hidden';
        
                if (!isHidden) {
                  const textNodes = Array.from(elem.childNodes).filter((node) => {
                    return node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue!);
                  });
        
                  if (textNodes.length > 0 && textNodes[0]) {
                    const text = textNodes[0].nodeValue;
        
                    if (text !== null && text.length > 0) {
                      nChars += text.length + 1; // for newline
        
                      if (nChars < maxChars) {
                        visibleText.push(text);
                      } else {
                        break;
                      }
                    }
                  }
                }
              }
        
              return visibleText.join('\n');
            }
          });
        
          const selectedText = result[0]['result'];
          this.setSelectedText(selectedText);
        } catch (e) {
          console.error(e); // Log any potential errors
        }
      }
    
      public recommend() {
        if (this._selectedText.length > 30) {
          let header = { headers : new HttpHeaders().set('Authorization', `Bearer ${this._tokenStore.getAccessToken()}`)}
          this.httpClient.post<any>('https://pbbo1qd4je.execute-api.us-east-2.amazonaws.com/Prod/recommend/',
            { 'message': this._selectedText }).pipe(
              mergeMap((songData : any) => {
                return this.httpClient.get<SearchContent>(`https://api.spotify.com/v1/search?q=track:\"${songData['recommendations'][0]['song_name']}\" artist:\"${songData['recommendations'][0]['artist_name']}\"&type=track&limit=1`, header)
              })
            ).subscribe((songReturn : SearchContent) => {
              console.log(songReturn.tracks?.items[0])
            })
        } else {
    
        }
    
      }
    
      get selectedText(): string {
        return this._selectedText; 
      }


}

