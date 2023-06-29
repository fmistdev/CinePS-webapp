import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Credentials, Membre, Token } from '../models/api.model';
import { env } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { httpOptions } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private expirationTimeoutID = 0;

  constructor(private http: HttpClient, private message: MessageService) {}

  // isValidToken(): boolean {
  //   const token = this.getToken();
  //   const expirationDate = getExpirationDate(token);
  //   const now = new Date();
  //   const isTokenExpired = expirationDate < now;

  //   // reset schedule token expiration mecanism
  //   this.cancelScheduleTokenExpiration();

  //   if (!isTokenExpired) {
  //     const expirationOffset = expirationDate.getTime() - now.getTime();
  //     this.scheduleTokenExpiration(expirationOffset);
  //   }
  //   return !isTokenExpired;
  // }

  // scheduleTokenExpiration(offset: number): void {
  //   const remainingMinutes = Math.round(offset / 1000 / 60);
  //   this.message.debug(this.constructor.name, `scheduleTokenExpiration ${remainingMinutes} min`);
  //   this.expirationTimeoutID = window.setTimeout(() => {
  //     // this will trigger isAuthenticated$ for the whole app
  //     this.isAuthenticated$.next(false);
  //   }, offset);
  // }

  // cancelScheduleTokenExpiration(): void {
  //   window.clearTimeout(this.expirationTimeoutID);
  //   this.expirationTimeoutID = 0;
  // }

  // isAuthenticated(): Observable<boolean> {
  //   return this.isAuthenticated$.asObservable();
  // }

  login(credentials: Credentials): Observable<string> {
    this.message.debug(this.constructor.name, 'try to login');
    return this.http
      .post<Token>(`${env.apiUrl}/api/login_check`, credentials)
      .pipe(map((x) => x.token));
  }

  getMembers(): Observable<Membre[]> {
    this.message.debug(this.constructor.name, 'try to getMembres');
    return this.http.get<Membre[]>(`${env.apiUrl}/api/membres`, httpOptions);
  }

  getMembre(id: number): Observable<Membre> {
    this.message.debug(this.constructor.name, 'try to getMembre');
    return this.http.get<Membre>(
      `${env.apiUrl}/api/membres/${id}`,
      httpOptions
    );
  }
}
