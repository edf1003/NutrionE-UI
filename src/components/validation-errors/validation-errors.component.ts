import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent {
  @Input() control: AbstractControl;
  @Input() errorClass: string;

  get errorText(): string {
    if (this.control && this.control.dirty && this.control.invalid && this.control.errors) {
      if (this.control.errors['email'] || this.control.errors['pattern']) return 'Introduce un correo válido';
      else if (this.control.errors['required']) return 'Este campo es obligatorio';
      else if (this.control.errors['minlength'])
        return 'El campo debe tener al menos ' + this.control.errors['minlength'].requiredLength + ' caracteres';
      else if (this.control.errors['min'])
        return 'El valor está por debajo del mínimo (' + this.control.errors['min'].min + ')';
      else if (this.control.errors['max'])
        return 'El valor está por encima del máximo (' + this.control.errors['max'].max + ')';
    }

    return '';
  }
}
