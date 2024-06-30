import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleFitService {
  constructor(private http: HttpClient) {}

  private getBaseUrl() {
    return 'https://pclp3skl-5129.euw.devtunnels.ms' + `/api/GoogleFit`;
  }

  getDailyCaloriesForLastWeek(): Observable<number[]> {
    return this.http.get<number[]>(`${this.getBaseUrl()}/GetDailyCaloriesForLastWeek`).pipe();
  }

  getDailyStepsForLastWeek(): Observable<number[]> {
    return this.http.get<number[]>(`${this.getBaseUrl()}/GetDailyStepsForLastWeek`).pipe();
  }

  getCredentials(): Observable<unknown> {
    return this.http.get(`${this.getBaseUrl()}/Access`).pipe();
  }
}
