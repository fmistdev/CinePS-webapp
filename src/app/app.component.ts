import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { filter, take, takeUntil } from 'rxjs';
import { AuthSelectors, AuthActions } from './state/auth.state';
import { CinePsActions } from './state/cineps.actions';
import { SubscriptionCleaner } from './utils/subscription-cleaner';
import { CinePsSelectors } from './state/cineps.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class AppComponent extends SubscriptionCleaner {
  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    // fetch data if token is valid
    this.store
      .select(AuthSelectors.slices.token)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((token) => {
        if (token) {
          // this line should disapear when 'user' and 'membre' tables will be merged
          this.store.dispatch(new AuthActions.GetMembers());

          this.store.dispatch(new CinePsActions.GetCurrent());
        }
      });

    // when auth is fully completed
    this.store
      .select(AuthSelectors.slices.userId)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((userId) => {
        if (userId > -1) {
          this.store.dispatch(new CinePsActions.HasUserVoted());
        }
      });

    // when current semaine is defined, init app getting member that had already voted
    this.store
      .select(CinePsSelectors.slices.currentSemaine)
      .pipe(
        filter((currentSemaine) => !!currentSemaine),
        take(1)
        // takeUntil(this.isDestroyed$)
      )
      .subscribe((currentSemaine) => {
        if (currentSemaine) {
          this.store.dispatch(new CinePsActions.GetHavingVotedMembers());
        }
      });
  }

  // if user known, get a voté?

  // is user the proposeur?
}
