import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyDietDTO } from 'src/models/models-classes';

@Injectable()
export class DailyDietsService {
  constructor(private http: HttpClient) {}

  private getBaseUrl() {
    return 'https://pclp3skl-5129.euw.devtunnels.ms' + `/api/DailyDiet`;
  }

  getDailyDiet(): Observable<DailyDietDTO> {
    return this.http.get<DailyDietDTO>(`${this.getBaseUrl()}/GetDailyDiet`).pipe();
  }

  createDailyDiet(): Observable<DailyDietDTO> {
    return this.http.post<DailyDietDTO>(`${this.getBaseUrl()}/CreateDailyDiet`, null).pipe();
  }
}
