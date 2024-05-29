import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDTO } from 'src/models/models-classes';

@Injectable()
export class UsersService {
  readonly emailValidationPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  currentUser: UserDTO = null;

  constructor(private http: HttpClient) {}

  private getBaseUrl() {
    return 'https://pclp3skl-5129.euw.devtunnels.ms' + `/api/Users`;
  }

  getCurrentUser(): Observable<UserDTO> {
    if (!this.currentUser) {
      return this.http.get<UserDTO>(`${this.getBaseUrl()}/GetUser`).pipe(tap(u => (this.currentUser = u)));
    }
    return of(this.currentUser);
  }

  updateUser(dto: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.getBaseUrl()}/UpdateUser`, dto).pipe(tap(() => this.getCurrentUser()));
  }
}
