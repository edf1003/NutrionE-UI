import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItemDTO } from 'src/models/models-classes';

@Component({
  selector: 'app-nb-simple-select',
  templateUrl: './nb-simple-select.component.html',
  styleUrls: ['./nb-simple-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSimpleSelectComponent),
      multi: true,
    },
  ],
})
export class NbSimpleSelectComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;
  @Input() label: string;
  @Input() showLabel = false;
  @Input() filter = false;
  @Input() filterPlaceholder = 'Buscar...';
  @Input() multiple = false;
  @Input() visibleOptions = 5;
  @Input() clearButton = true;
  @Input() options: SelectItemDTO<unknown>[];
  control: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
    }
  }

  trackBy(index: number, name: SelectItemDTO<unknown>) {
    return name.value;
  }

  registerOnChange() {
    return;
  }

  registerOnTouched() {
    return;
  }
  writeValue() {
    return;
  }
  setDisabledState() {
    return;
  }
}
