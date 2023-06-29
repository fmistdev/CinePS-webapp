import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';

import { Observable, catchError, map, of, throwError } from 'rxjs';

import { Store } from '@ngxs/store';
import { AuthActions, AuthSelectors, AuthState } from '../state/auth.state';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthSelectors.slices.token);
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === HttpStatusCode.Unauthorized) {
            console.warn(`[AuthInterceptor] Unauthorized => logout`);
            this.store.dispatch(new AuthActions.Logout());
            // mask handled error
            return of();
          }
        }
        return throwError(() => error);
      })
    );
  }
}
