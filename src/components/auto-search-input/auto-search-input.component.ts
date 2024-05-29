import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-auto-search-input',
  templateUrl: './auto-search-input.component.html',
  styleUrls: ['./auto-search-input.component.scss'],
})
export class AutoSearchInputComponent implements OnDestroy {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() search: string;
  @Input() debounceTime = 600;
  @Input() small = false;

  searchEvents: Subject<string>;
  @Output() searchChange = new EventEmitter<string>();
  sub: Subscription;

  constructor() {
    this.searchEvents = new Subject<string>();
    this.sub = this.searchEvents.pipe(debounceTime(this.debounceTime)).subscribe(e => this.searchChange.next(e || ''));
  }

  onModelChange($event: string) {
    this.search = $event;
    this.searchEvents.next(this.search);
  }

  ngOnDestroy() {
    if (!this.searchEvents.closed) this.searchEvents.unsubscribe();
    if (!this.sub.closed) this.sub.unsubscribe();
  }
}
