import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';

import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthActions } from '../state/auth.state';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  

  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.debug('HttpErrorInterceptor intercept');
    let handled = false;

    return next.handle(req).pipe(
      // a second chance ?
      // retry(1),
      catchError((error) => {
        let errorMessage = '';

        if (error.error instanceof Error) {
          errorMessage = `[Interceptor] EventError: ${error.error.message}`;
        } else if (error instanceof HttpErrorResponse) {
          errorMessage = `[Interceptor] HttpError Status ${error.status}: ${error.error.error} - ${error.error.message}`;
          handled = this.handleServerSideError(error);
        } 

        // console.error(errorMessage ? errorMessage : error);

        // not handled
        // if (!handled) {
        //   if (errorMessage) {
        //     return throwError(() => new Error(errorMessage));
        //   } else {
        //     return throwError(() => new Error('Unexpected problem occurred'));
        //   }
        // // handled
        // } else {
        //   return of(error);
        // }
  
        return throwError(() => error);
      }),
    );
  }



  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      // Une authentification est nécessaire pour accéder à la ressource. 
      case HttpStatusCode.Unauthorized:
        // this.routeMessageService.message = "Please login again.";
        console.info(`[Interceptor] Unauthorized => logout`);
        this.store.dispatch(new AuthActions.Logout());
        handled = true;
        break;

      // //  les droits d'accès ne permettent pas au client d'accéder à la ressource.
      // case HttpStatusCode.Forbidden:
      //   // this.routeMessageService.message = "Please login again.";
      //   // this.authenticationService.logout();
      //   handled = true;
      //   break;
    }

    return handled;
  }
  
}




