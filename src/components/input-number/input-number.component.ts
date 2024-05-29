/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  value: any;
  @Input() interval = 1;
  @Input() decimalDigits = 0;
  @Input() showButtons = true;
  @Input() nullable = false;
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;
  @Input() append: string;

  onChange: (val: typeof this.value) => void = () => undefined;
  onTouch: () => void = () => undefined;

  increase() {
    this.value =
      Math.round((parseFloat(this.value) + this.interval) * Math.pow(10, this.decimalDigits)) /
      Math.pow(10, this.decimalDigits);
    if (this.max || this.max === 0) this.value = Math.min(this.value, this.max);
    this.onTouch();
    this.onChange(this.value);
  }

  decrease() {
    this.value =
      Math.round((parseFloat(this.value) - this.interval) * Math.pow(10, this.decimalDigits)) /
      Math.pow(10, this.decimalDigits);
    if (this.min || this.min === 0) this.value = Math.max(this.value, this.min);
    this.onTouch();
    this.onChange(this.value);
  }

  onInput(event) {
    if (event.data === '.') return;
    const value = parseFloat(event.target['value']);
    if (this.nullable) this.value = Number.isNaN(value) ? null : value;
    else this.value = Number.isNaN(value) ? 0 : value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (this.nullable) this.value = value || value === 0 ? value : null;
    else this.value = value ? value || 0 : 0;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
