import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
export class GetTextService {

    constructor() {
        chrome.tabs.executeScript( { code: 'window.getSelection().toString();'}, selectedText => {
            (document.getElementById('text-input') as HTMLInputElement).value = selectedText[0];
             console.log(selectedText[0]);
           });
    }

}

