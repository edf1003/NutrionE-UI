import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { DailyRoutinesService } from 'src/services/daily-routines.service';

@Injectable()
export class DailyRoutinesResolver {
  constructor(private dailyRoutinesService: DailyRoutinesService) {}

  resolve() {
    return this.dailyRoutinesService.getDailyRoutine().pipe(
      catchError(err => {
        throw err;
      }),
    );
  }
}
