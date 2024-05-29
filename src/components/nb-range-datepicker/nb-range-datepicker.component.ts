import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-nb-range-datepicker',
  templateUrl: './nb-range-datepicker.component.html',
  styleUrls: ['./nb-range-datepicker.component.scss'],
})
export class NbRangeDatepickerComponent implements OnInit {
  @Input() range = false;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() startLabel = 'Inicio';
  @Input() endLabel = 'Fin';
  @Input() startRequired = false;
  @Input() endRequired = false;
  @Input() startMarginBottomClass = 'mb-3';
  @Input() endMarginBottomClass = 'mb-3';
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();
  datepickerForm = this.formBuilder.group({
    startDate: [null as Date],
    endDate: [null as Date],
  });

  get maxDateForStartDate() {
    return this.datepickerForm.value.endDate ? dayjs(this.datepickerForm.value.endDate).add(1, 'day').toDate() : null;
  }

  get minDateForEndDate() {
    return this.datepickerForm.value.startDate
      ? dayjs(this.datepickerForm.value.startDate).subtract(1, 'day').toDate()
      : null;
  }

  constructor(
    public utilsService: UtilsService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.datepickerForm.reset({
      startDate: this.startDate ? dayjs(this.startDate).toDate() : null,
      endDate: this.endDate ? dayjs(this.endDate).toDate() : null,
    });
    if (this.startRequired) this.datepickerForm.controls.startDate.addValidators([Validators.required]);
    if (this.endRequired) this.datepickerForm.controls.endDate.addValidators([Validators.required]);
  }

  onStartDateChange(date: Date) {
    this.startDateChange.emit(date);
  }

  onEndDateChange(date: Date) {
    this.endDateChange.emit(date);
  }

  onStartDateClear() {
    this.datepickerForm.controls.startDate.setValue(null);
    if (this.startRequired) {
      this.datepickerForm.controls.startDate.markAsDirty();
    }
    this.startDateChange.emit(null);
  }

  onEndDateClear() {
    this.datepickerForm.controls.endDate.setValue(null);
    if (this.startRequired) {
      this.datepickerForm.controls.endDate.markAsDirty();
    }
    this.endDateChange.emit(null);
  }
}
