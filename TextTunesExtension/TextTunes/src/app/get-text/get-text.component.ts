// get-text.component.ts
import { Component, NgZone } from '@angular/core';
import { GetTextService } from './get-text.component.service';

@Component({
  selector: 'GetTextComponent',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.css']
})
export class GetTextComponent {

  constructor(public getTextService: GetTextService, private ngZone: NgZone) { }

  selectedText: string = 'Type, Highlight or Select All Text on the page to get a song recommendation!';

  public setSelectedText(selectedText: string) {
    this.selectedText = selectedText;
    this.ngZone.run(() => {}); // Trigger manual change detection
  }
  private async getTabId() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.id;
  }

  public async getText() {
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
}