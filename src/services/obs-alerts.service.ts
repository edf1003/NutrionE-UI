/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class ObsAlertsService {
  private errorMap = {
    '0': 'Error de conexión. Comprueba tu acceso a Internet',
    '401': 'Tu sesión ha caducado. Por favor, accede de nuevo',
    '403': 'No tienes permisos para acceder a esta parte del sistema',
    '404': 'Error - No se encontraron datos del usuario',
    '409': 'No se pudo realizar la operación. Inténtalo más tarde',
    '412': 'Versión desactualizada',
    '500': 'Ocurrió un error al procesar tu solicitud',
  };

  constructor(private toastr: ToastrService) {}

  private getToastDataForError(error): Toast {
    const t: Toast = { text: '', type: ToastType.ERROR };
    let message: string = this.errorMap['500'];
    if (error['name'] === 'TimeoutError') message = this.errorMap['0'];
    else if (error.custom) message = error.msg || this.errorMap['500'];
    else if (error instanceof HttpErrorResponse) {
      if (error.status === 401) t.type = ToastType.INFO;
      if (error.error instanceof Error) {
        message = this.errorMap['0'];
      } else {
        message = this.errorMap[error.status.toString()] || this.errorMap['500'];
      }
    }
    t.text = message;
    return t;
  }

  GetErrorMessageForStatus(error) {
    const t: Toast = this.getToastDataForError(error);
    return this.toastr.show(t.text, '', null, t.type);
  }

  ShowMessage(
    message: string,
    type: ToastType | string = ToastType.INFO,
    title = '',
    config: Partial<IndividualConfig<unknown>> = null,
  ) {
    return this.toastr.show(message, title, config, type);
  }
}

class Toast {
  text: string;
  type: string;
}

export enum ToastType {
  INFO = 'toast-info',
  SUCCESS = 'toast-success',
  ERROR = 'toast-error',
  WARNING = 'toast-warning',
}
