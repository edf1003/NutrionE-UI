import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Injectable()
export class FormArrayUtilsService {
  constructor(private formBuilder: FormBuilder) {}

  upItem(formArray: FormArray, index: number) {
    if (index === 0) return;
    const control = formArray.controls[index];
    formArray.removeAt(index);
    formArray.insert(index - 1, control);
  }

  downItem(formArray: FormArray, index: number) {
    if (index === formArray.value.length - 1) return;
    const control = formArray.controls[index];
    formArray.removeAt(index);
    formArray.insert(index + 1, control);
  }
}
