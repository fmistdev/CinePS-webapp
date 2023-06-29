import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';

@Component({
  selector: 'app-proposeur-view',
  templateUrl: './proposeur-view.component.html',
  styleUrls: ['./proposeur-view.component.scss'],
})
export class ProposeurViewComponent extends SubscriptionCleaner {
  isProposeurDefined$ = this.store.select(CinePsSelectors.isProposeurDefined);
  isUserProposeur$ = this.store.select(CinePsSelectors.isUserProposeur);
  
  constructor(private store: Store) {
    super();
  }

}
