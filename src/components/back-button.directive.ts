import { Location } from '@angular/common';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBackButton]',
})
export class BackButtonDirective {
  @Input() backButton: boolean;

  constructor(private location: Location) {}

  @HostListener('click')
  onClick() {
    if (this.backButton) this.location.back();
  }
}
