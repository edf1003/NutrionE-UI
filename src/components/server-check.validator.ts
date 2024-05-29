/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AbstractControl } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

export class ServerCheckValidator {
  static createValidator(func: (s: string) => Observable<unknown>, errorName = 'serverError') {
    return (control: AbstractControl) =>
      timer(200).pipe(
        switchMap(() => func(control.value)),
        map(() => null),
        catchError(() => {
          const errors = {};
          errors[errorName] = true;
          return of(errors);
        }),
        take(1),
      );
  }
}
