import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
})
export class ScrollToBottomDirective {
  constructor(private el: ElementRef) {}

  scrollToBottom() {
    setTimeout(() => {
      this.el.nativeElement.scrollTop = +this.el.nativeElement.scrollHeight;
    }, 100);
  }
}
