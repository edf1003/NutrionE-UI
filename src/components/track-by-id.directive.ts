/* eslint-disable @angular-eslint/directive-selector */
import { NgForOf } from '@angular/common';
import { Directive, Host } from '@angular/core';

@Directive({
  selector: '[ngForTrackById]',
})
export class NgForTrackByIdDirective<T extends TrackByItem> {
  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item.id;
  }
}

interface TrackByItem {
  id: unknown;
}
