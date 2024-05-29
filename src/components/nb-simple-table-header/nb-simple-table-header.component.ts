import { Component, Input } from '@angular/core';
import { NbSimpleTableParams, SelectItemDTO } from 'src/models/models-classes';
import { NbSimpleTableService } from 'src/services/nb-simple-table.service';

@Component({
  selector: '[app-nb-simple-table-header]',
  templateUrl: './nb-simple-table-header.component.html',
  styleUrls: ['./nb-simple-table-header.component.scss'],
})
export class NbSimpleTableHeaderComponent {
  @Input() tableParams: NbSimpleTableParams<unknown>;
  @Input() label: string;
  @Input() orderField: string;
  @Input() filter = false;
  @Input() filterField: string;
  @Input() filterType: 'text' | 'select' = 'text';
  @Input() selectOptions: SelectItemDTO<unknown>[];

  constructor(public nbSimpleTableService: NbSimpleTableService) {}
}
