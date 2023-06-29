import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, takeUntil } from 'rxjs';
import { CinePsActions } from 'src/app/state/cineps.actions';
import { CinePsSelectors } from 'src/app/state/cineps.state';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';

@Component({
  selector: 'app-propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.scss'],
})
export class ProposeComponent extends SubscriptionCleaner {
  theme = '';
  filmTitle = '';
  filmYear = new Date().getFullYear();
  filmImdbLink = '';

  propositions$ = this.store.select(CinePsSelectors.propositions);

  isPropositionInProgress$ = this.store.select(
    CinePsSelectors.isPropositionInProgress
  );

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(CinePsSelectors.slices.currentSemaine)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((currentSemaine) => {
        this.theme = currentSemaine?.theme ? currentSemaine.theme : '';
      });
  }

  deleteProposition(propositionId: number) {
    alert(
      `deleteProposition "${propositionId}"\n(not implemented, need dedicated endpoint)`
    );
  }

  addTheme() {
    this.store.dispatch(new CinePsActions.SetTheme(this.theme));
  }

  addFilm() {
    this.store.dispatch(
      new CinePsActions.ProposeFilm({
        titre_film: this.filmTitle,
        sortie_film: this.filmYear,
        imdb_film: this.filmImdbLink,
      })
    );
  }

  togglePropositionTerminee() {
    this.store.dispatch(new CinePsActions.TogglePropositionTerminee());
  }
}
