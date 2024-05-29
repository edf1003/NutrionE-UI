import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { DailyDietsService } from 'src/services/daily-diets.service';

@Injectable()
export class DailyDietResolver {
  constructor(private dailyDietsService: DailyDietsService) {}

  resolve() {
    return this.dailyDietsService.getDailyDiet().pipe(
      catchError(err => {
        throw err;
      }),
    );
  }
}
