import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbPopoverDirective } from 'mdb-angular-ui-kit/popover';

@Component({
  selector: 'app-page-navigation-buttons',
  templateUrl: './page-navigation-buttons.component.html',
  styleUrls: ['./page-navigation-buttons.component.scss'],
})
export class PageNavigationButtonsComponent {
  @Input() pageSize: number;
  @Input() currentPage: number;
  @Input() itemsLength: number;
  @Input() totalCount: number;
  @Input() loading = false;
  @Input() onlyArrows = false;

  seekPage: number;

  @Output() back = new EventEmitter<void>();
  @Output() forward = new EventEmitter<void>();
  @Output() seek = new EventEmitter<number>();

  get totalPages() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  getText() {
    return (
      (this.totalCount === 0 ? 0 : this.currentPage * this.pageSize + 1) +
      '-' +
      (this.loading ? '?' : this.currentPage * this.pageSize + this.itemsLength)
    );
  }

  seekButtonDisabled() {
    return (
      !this.seekPage ||
      this.seekPage < 1 ||
      (this.seekPage - 1) * this.pageSize >= this.totalCount ||
      this.seekPage - 1 === this.currentPage
    );
  }

  onSeekClick(popover: MdbPopoverDirective) {
    if (this.itemsLength < this.totalCount) {
      this.seekPage = this.currentPage + 1;
      popover.toggle();
    }
  }
}
