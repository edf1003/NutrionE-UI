import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-value-card',
  templateUrl: './dashboard-value-card.component.html',
  styleUrls: ['./dashboard-value-card.component.scss'],
})
export class DashboardValueCardComponent {
  @Input() icon = 'fas fa-info-circle';
  @Input() iconColor = 'secondary';
  @Input() title: string;
  @Input() value: unknown;
  @Input() value2: unknown;
  @Input() clickable = true;
  @Output() clicked = new EventEmitter<void>();
}
