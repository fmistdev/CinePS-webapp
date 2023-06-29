import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs';
import { AuthSelectors } from 'src/app/state/auth.state';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { decodeToken } from 'src/app/utils/services.utils';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent extends SubscriptionCleaner {
  isAuthenticated$ = this.store.select(AuthSelectors.isAuthenticated);
  user$ = this.store.select(AuthSelectors.user);
  hasUserVoted$ = this.store.select(CinePsSelectors.slices.hasUserVoted);
  currentSemaine$ = this.store.select(CinePsSelectors.slices.currentSemaine);
  decodedToken$ = this.store.select(AuthSelectors.slices.decodedToken);
  isUserProposeur$ = this.store.select(CinePsSelectors.isUserProposeur);

  constructor(private store: Store) {
    super();
  }
}
