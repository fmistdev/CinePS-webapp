import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
  createPropertySelectors,
} from '@ngxs/store';

import { CinePsActions } from './cineps.actions';
import { ApiService } from '../services/api.service';
import { AuthSelectors } from './auth.state';
import { CurrentSemaine, HavingVotedMember } from '../models/api.model';

// -------------------------------- Model --------------------------------
interface CinePsStateModel {
  currentSemaine?: CurrentSemaine;
  hasUserVoted?: boolean;
  havingVotedMembers: HavingVotedMember[];
}

// -------------------------------- Reducer --------------------------------
const CINEPS_STATE_TOKEN = new StateToken<CinePsStateModel>('cineps');

@State({
  name: CINEPS_STATE_TOKEN,
  defaults: {
    currentSemaine: undefined,
    hasUserVoted: undefined,
    havingVotedMembers: [],
  },
})
@Injectable()
export class CinePsState {
  constructor(private apiService: ApiService, private store: Store) {}

  @Action(CinePsActions.GetCurrent)
  getCurrentSemaine(ctx: StateContext<CinePsStateModel>) {
    return this.apiService.getCurrentSemaine().pipe(
      tap((currentSemaine) => ctx.patchState({ currentSemaine })),
      catchError((error) => {
        console.error(error);
        ctx.patchState({ currentSemaine: undefined });
        return of();
      })
    );
  }

  @Action(CinePsActions.HasUserVoted)
  hasUserVoted(ctx: StateContext<CinePsStateModel>) {
    const userId = this.store.selectSnapshot(AuthSelectors.slices.userId);
    return this.apiService.aVoteCurrentSemaine(userId).pipe(
      tap((hasUserVoted) => ctx.patchState({ hasUserVoted })),
      catchError((error) => {
        console.error(error);
        ctx.patchState({ hasUserVoted: undefined });
        return of();
      })
    );
  }

  @Action(CinePsActions.SetTheme)
  patchSemaine(
    ctx: StateContext<CinePsStateModel>,
    action: CinePsActions.SetTheme
  ) {
    const currentSemaine = ctx.getState().currentSemaine;
    if (!currentSemaine) {
      return;
    }
    return this.apiService
      .patchSemaine(currentSemaine.id, { theme: action.theme })
      .pipe(
        tap((currentSemaine) => ctx.patchState({ currentSemaine })),
        catchError((error) => {
          console.error(error);
          return of();
        })
      );
  }

  @Action(CinePsActions.TogglePropositionTerminee)
  togglePropositionTerminee(ctx: StateContext<CinePsStateModel>) {
    const currentSemaine = ctx.getState().currentSemaine;
    if (!currentSemaine) {
      return;
    }
    return this.apiService
      .patchSemaine(currentSemaine.id, {
        proposition_terminee: !currentSemaine.proposition_termine,
      })
      .pipe(
        tap((currentSemaine) => ctx.patchState({ currentSemaine })),
        catchError((error) => {
          console.error(error);
          return of();
        })
      );
  }

  @Action(CinePsActions.ProposeFilm)
  proposeFilm(
    ctx: StateContext<CinePsStateModel>,
    action: CinePsActions.ProposeFilm
  ) {
    const currentSemaine = ctx.getState().currentSemaine;
    if (!currentSemaine) {
      return;
    }
    return this.apiService.postProposition(action.postPropositionBody).pipe(
      tap((_) => ctx.dispatch(new CinePsActions.GetCurrent())),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  @Action(CinePsActions.GetHavingVotedMembers)
  getHavingVotedMembers(ctx: StateContext<CinePsStateModel>) {
    const currentSemaine = ctx.getState().currentSemaine;
    if (!currentSemaine) {
      return;
    }
    return this.apiService.getHavingVotedMembers(currentSemaine.id).pipe(
      tap((havingVotedMembers) => ctx.patchState({ havingVotedMembers })),
      catchError((error) => {
        console.error(error);
        ctx.patchState({ havingVotedMembers: undefined });
        return of();
      })
    );
  }

  @Action(CinePsActions.VoteProposition)
  voteProposition(
    ctx: StateContext<CinePsStateModel>,
    action: CinePsActions.VoteProposition
  ) {
    const userId = this.store.selectSnapshot(AuthSelectors.slices.userId);
    const body = {
      membre: userId,
      proposition: action.propositionVote.propositionId,
      vote: action.propositionVote.score,
    };
    return this.apiService.postSaveVoteProposition(body).pipe(
      tap((_) => ctx.dispatch(new CinePsActions.GetCurrent())),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }

  @Action(CinePsActions.CloseVote)
  closeVote(ctx: StateContext<CinePsStateModel>) {
    const userId = this.store.selectSnapshot(AuthSelectors.slices.userId);
    return this.apiService.postAVote(userId).pipe(
      tap((_) =>
        ctx.dispatch([
          new CinePsActions.GetHavingVotedMembers(),
          new CinePsActions.HasUserVoted(),
        ])
      ),
      catchError((error) => {
        console.error(error);
        return of();
      })
    );
  }
}

// -------------------------------- Selectors --------------------------------

export class CinePsSelectors {
  static slices = createPropertySelectors<CinePsStateModel>(CinePsState);

  @Selector([
    AuthSelectors.slices.userId,
    CinePsSelectors.slices.currentSemaine,
  ])
  static isUserProposeur(userId: number, currentSemaine: CurrentSemaine) {
    return currentSemaine?.proposeur?.id === userId;
  }

  @Selector([CinePsSelectors.slices.currentSemaine])
  static isProposeurDefined(currentSemaine: CurrentSemaine) {
    return Boolean(currentSemaine?.proposeur?.id);
  }

  @Selector([CinePsSelectors.slices.currentSemaine])
  static isPropositionInProgress(currentSemaine: CurrentSemaine) {
    if (!currentSemaine) {
      return false;
    }
    // currentSemaine undefined => false
    // proposition_termine undefined => false
    // proposition_termine true => false
    // proposition_termine false => true
    return currentSemaine.proposition_termine === false;
  }

  @Selector([CinePsSelectors.slices.currentSemaine])
  static propositions(currentSemaine: CurrentSemaine) {
    return currentSemaine ? currentSemaine.propositions : [];
  }

  @Selector([CinePsSelectors.slices.havingVotedMembers])
  static havingVotedCount(havingVotedMembers: HavingVotedMember[]) {
    return havingVotedMembers.length;
  }
}
