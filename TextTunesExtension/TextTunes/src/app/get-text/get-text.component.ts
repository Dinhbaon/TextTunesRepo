// get-text.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';


@Component({
  selector: 'GetTextComponent',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css']
})
export class GetTextComponent {

  constructor(private ngZone: NgZone, private httpClient : HttpClient) { }

  selectedText: string = 'Type, Highlight or Select All Text on the page to get a song recommendation!';

  public setSelectedText(selectedText: string) {
    this.selectedText = selectedText;
    this.ngZone.run(() => {}); // Trigger manual change detection
  }
  private async getTabId() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.id;
  }
  public async getSelectedText() {
    const tabId = await this.getTabId();
    console.log(tabId);
    
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
    console.log(tabId);
  
    if (!tabId) {
      return; // Handle the case where there is no active tab
    }
  
    try {
      const result = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func:  () => {
          let body = document.querySelector('body');
          const excludedTags = ['nav', 'header', 'footer', 'script', 'style', 'a'];
          
          if (document.querySelector('#content')) {
            body = document.querySelector('#content');
          }
          if (document.querySelector('main')) {
            body = document.querySelector('main') as HTMLBodyElement;
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
                return node.nodeType === Node.TEXT_NODE;
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
      console.log(selectedText);
      this.setSelectedText(selectedText);
    } catch (e) {
      console.error(e); // Log any potential errors
    }
  }

  public recommend() {
    if (this.selectedText.length > 30) {
      this.httpClient.post('https://pbbo1qd4je.execute-api.us-east-2.amazonaws.com/Prod/recommend/', 
      {'message': this.selectedText}).subscribe((songData) => {
        console.log(songData)
      })
    } else {
      
    }

  }

}


