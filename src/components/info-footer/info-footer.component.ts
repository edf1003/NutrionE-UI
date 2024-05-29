import { Component } from '@angular/core';

@Component({
  selector: 'app-info-footer',
  templateUrl: './info-footer.component.html',
  styleUrls: ['./info-footer.component.scss'],
})
export class InfoFooterComponent {
  currentDate;

  constructor() {
    this.currentDate = new Date();
  }
}
