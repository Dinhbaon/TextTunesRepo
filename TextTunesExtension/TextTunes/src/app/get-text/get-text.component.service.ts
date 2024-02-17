import { Injectable } from "@angular/core";
import { GetTextComponent } from "./get-text.component";

@Injectable({
    providedIn: 'root'
  })
export class GetTextService {

    constructor( ) {

    }

  private isHidden= (el: Element) => {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
  }
  // Returns only the visible text from the page
  public getVisibleText = () => {

    var body = document.querySelector('body')

    console.log('in')

    if (document.querySelector('#content')) {
        body = document.querySelector('#content');
    }
    if (document.querySelector('main')) {
        body = document.querySelector('main') as HTMLBodyElement;
    }
    var allTags = body!.getElementsByTagName('*');

    let visibleText = [];
    var nChars = 0;
    // Select all visible text in the body, up to charLimit

    for (var i = 0, max = allTags.length; i < max; i++) {
        var elem = allTags[i];
        if (!this.isHidden(elem)) {
    
            var textNodes = Array.from(elem.childNodes).filter(function(node) {
                return node.nodeType === Node.TEXT_NODE;
            });
            console.log(textNodes)
            // Check if there are text nodes and the first one is truthy
            if (textNodes.length > 0 && textNodes[0]) {
                var text = textNodes[0].nodeValue;
    
                if (text !== null && text.length > 0) {
                    nChars += text.length + 1; // for newline
    
                    if (nChars < 10000) {
                        visibleText.push(text);
                    } else {
                        break;
                    }
                }
            }
        }
    }
    // Separate all the text elements with a newline
    return visibleText.join('\n');
}



}

