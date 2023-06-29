import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';

import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.state';
import { Navigate } from '@ngxs/router-plugin';

// TODO: payload plus detaillée: ['/crisis-center', { foo: 'foo' }]
// export class RouteNavigate {
//   static readonly type = '[Route] Navigate';
//   constructor(public path: string) {}
// }

// @Injectable({ providedIn: 'root' })
// export class RouteHandler {
//   constructor(private router: Router, private actions$: Actions) {
//     this.actions$
//       .pipe(ofActionDispatched(Navigate))
//       .subscribe(({ path }) => {
//         console.debug('RouteHandler', path);
//         this.router.navigate([path]);
//       });

//       // this.actions$
//       // .pipe(ofActionDispatched(AuthActions.Logout))
//       // .subscribe(() => {
//       //   this.authService.logout();
//       //   // this.store.dispatch(new MemberActions.SetUser(defaultMember));
//       //   // console.debug('RouteHandler', path);
//       //   // this.router.navigate([path]);
//       // });
//   }

// }
