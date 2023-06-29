import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { ProposeComponent } from '../proposeur/propose/propose.component';
import { Proposition } from 'src/app/models/api.model';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent {
  propositions$ = this.store.select(CinePsSelectors.propositions).pipe(map(propositions => [ ...propositions].sort(byScore)));
  havingVotedCount$ = this.store.select(CinePsSelectors.havingVotedCount);
  havingVotedMembers$ = this.store.select(CinePsSelectors.slices.havingVotedMembers);

  constructor(private store: Store) {}

  rankingAverage (score: number, havingVotedCount: number): number  {
    const defaultScore = 36;
    return Math.round(10 * (defaultScore - score) / havingVotedCount ) / 10;
  }

}



function byScore(a: Proposition, b: Proposition): number {
  return b.score - a.score;
}