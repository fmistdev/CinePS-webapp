import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate, RouterDataResolved, RouterState } from '@ngxs/router-plugin';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { map, takeUntil, tap } from 'rxjs';
import { AuthSelectors } from 'src/app/state/auth.state';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';

['ROLE_ADMIN'];

// roles = ["ROLE_USER", "ROLE_ADMIN"]

const roleAdmin = 'ROLE_ADMIN';

interface Link {
  label: string;
  path: string[];
  disabled?: boolean;
  permitted?: boolean;
  permission?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent extends SubscriptionCleaner {
  // TODO: disabled if no isauthenticated
  // non visible if wrong role

  links: Link[] = [
    {
      label: 'Accueil',
      path: ['/accueil'],
    },
    {
      label: 'Login',
      path: ['/login'],
    },
    {
      label: 'Debug',
      path: ['/debug'],
      permission: roleAdmin,
    },
    {
      label: 'Admin',
      path: ['/admin'],
      permission: roleAdmin,
    },
  ];

  path$ = this.actions$.pipe(
    ofActionSuccessful(RouterDataResolved),
    map((action) => (action as RouterDataResolved).routerState.url)
  );

  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  ngOnInit() {
    // manage disabled button
    this.store
      .select(AuthSelectors.isAuthenticated)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((isAuthenticated) => {
        this.links
          .filter((link) => !link.path.includes('/login'))
          .forEach((link) => (link.disabled = !isAuthenticated));
      });

    // manage button permission
    this.store
      .select(AuthSelectors.slices.decodedToken)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((decodedToken) => {
        this.links.forEach((link) => {
          if (link.permission) {
            link.permitted = decodedToken?.roles.includes(link.permission);
          } else {
            link.permitted = true;
          }
        });
      });
  }
}
