import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { AuthSelectors } from '../state/auth.state';
import { Navigate } from '@ngxs/router-plugin';

export const AuthGuard: CanActivateFn = (route, state) => {
  // console.debug('AuthGuard CanActivateFn');
  const store = inject(Store);

  // console.debug('AuthGuard CanActivateFn', auth.isAuthenticated());

  // const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
  // return isAuthenticated;

  return store.select(AuthSelectors.isAuthenticated).pipe(
    take(1),
    tap((isAuthenticated) => {
      console.debug('AuthGuard CanActivateFn isAuthenticated', isAuthenticated);
      if (!isAuthenticated) {
        store.dispatch(new Navigate(['/login']));
      }
    })
  );

  // if (!auth.isAuthenticated()) {
  //   store.dispatch(new RouteNavigate('/login'));
  //   // router.navigateByUrl('/login');
  //   return false;
  // }

  // return true;
};

export const AuthGuardChild: CanActivateChildFn = (route, state) => {
  console.debug('AuthGuardChild CanActivateChildFn: not implemented');

  return true;
};
