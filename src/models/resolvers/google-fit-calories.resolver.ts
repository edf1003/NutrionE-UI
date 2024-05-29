import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GoogleFitService } from 'src/services/google-fit.service';

@Injectable()
export class GoogleFitCaloriesResolver {
  constructor(private googleFitService: GoogleFitService) {}

  resolve() {
    return this.googleFitService.getDailyCaloriesForLastWeek().pipe(
      catchError(err => {
        throw err;
      }),
    );
  }
}
