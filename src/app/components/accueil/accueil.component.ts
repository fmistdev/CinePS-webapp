import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentSemaine } from 'src/app/models/api.model';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent extends SubscriptionCleaner {
  currentSemaine$ = this.store.select(CinePsSelectors.slices.currentSemaine);

  constructor(private store: Store) {
    super();
  }

  // TODO: this is fake, until the backend expose the deadline
  getDeadline(currentSemaine: CurrentSemaine): Date {
    const nextPsDate = new Date(currentSemaine.jour);
    nextPsDate.setHours(16);
    return nextPsDate;
  }
}
