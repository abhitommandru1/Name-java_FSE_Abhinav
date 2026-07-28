import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('div'));
    const directive = new Highlight(el);
    expect(directive).toBeTruthy();
  });

  it('sets the background color on mouseenter and clears it on mouseleave', () => {
    const nativeEl = document.createElement('div');
    const directive = new Highlight(new ElementRef(nativeEl));
    directive.appHighlight = 'lightblue';

    directive.onMouseEnter();
    expect(nativeEl.style.backgroundColor).toBe('lightblue');

    directive.onMouseLeave();
    expect(nativeEl.style.backgroundColor).toBe('');
  });
});
