import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyRoutineDTO, ExerciseType } from 'src/models/models-classes';

@Injectable()
export class DailyRoutinesService {
  constructor(private http: HttpClient) {}

  private getBaseUrl() {
    return 'https://pclp3skl-5129.euw.devtunnels.ms' + `/api/DailyRoutines`;
  }

  getDailyRoutine(): Observable<DailyRoutineDTO> {
    return this.http.get<DailyRoutineDTO>(`${this.getBaseUrl()}/GetDailyRoutine`).pipe();
  }

  createDailyRoutine(exerciseType: ExerciseType): Observable<DailyRoutineDTO> {
    return this.http.post<DailyRoutineDTO>(`${this.getBaseUrl()}/CreateDailyRoutine`, exerciseType).pipe();
  }
}
