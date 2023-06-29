import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { AuthSelectors } from 'src/app/state/auth.state';
import { CinePsSelectors } from 'src/app/state/cineps.state';

@Component({
  selector: 'app-voter-view',
  templateUrl: './voter-view.component.html',
  styleUrls: ['./voter-view.component.scss']
})
export class VoterViewComponent {
  isProposeurDefined$ = this.store.select(CinePsSelectors.isProposeurDefined);
  isUserProposeur$ = this.store.select(CinePsSelectors.isUserProposeur);
  isPropositionInProgress$ = this.store.select(
    CinePsSelectors.isPropositionInProgress
  );
  hasVotedUser$ = this.store.select(CinePsSelectors.slices.hasUserVoted);
  userId = this.store.selectSnapshot(AuthSelectors.slices.userId);
  
  propositions$ = this.store
    .select(CinePsSelectors.slices.currentSemaine)
    .pipe(map((c) => (c ? c.propositions : [])));

  constructor(private store: Store) {}
}
