import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GoogleFitService } from 'src/services/google-fit.service';

@Injectable()
export class GoogleFitStepsResolver {
  constructor(private googleFitService: GoogleFitService) {}

  resolve() {
    return this.googleFitService.getDailyStepsForLastWeek().pipe(
      catchError(err => {
        throw err;
      }),
    );
  }
}
