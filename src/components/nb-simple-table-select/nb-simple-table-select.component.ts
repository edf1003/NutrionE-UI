import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItemDTO } from 'src/models/models-classes';

@Component({
  selector: 'app-nb-simple-table-select',
  templateUrl: './nb-simple-table-select.component.html',
  styleUrls: ['./nb-simple-table-select.component.scss'],
})
export class NbSimpleTableSelectComponent {
  @Input() value: unknown;
  @Output() valueChange = new EventEmitter<unknown>();
  @Input() showLabel = false;
  @Input() filter = false;
  @Input() filterPlaceholder = 'Buscar...';
  @Input() multiple = false;
  @Input() visibleOptions = 5;
  @Input() clearButton = true;
  @Input() small = true;
  @Input() options: SelectItemDTO<unknown>[];

  trackBy(index: number, name: SelectItemDTO<unknown>) {
    return name.value;
  }
}
