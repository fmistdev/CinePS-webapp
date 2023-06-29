import { Injectable } from '@angular/core';
import {
  State,
  Selector,
  Action,
  StateContext,
  createPropertySelectors,
  Store,
} from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  Credentials,
  DecodedToken,
  Membre,
  defaultMember,
} from '../models/api.model';
import { decodeToken } from '../utils/services.utils';
import { Navigate } from '@ngxs/router-plugin';

// -------------------------------- Actions --------------------------------
export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: Credentials) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class SetUserId {
    static readonly type = '[Auth] Set User Id';
    constructor(public userId: number) {}
  }

  export class GetMembers {
    static readonly type = '[Auth] Get all members';
  }
}

// -------------------------------- Model --------------------------------
export interface AuthStateModel {
  token: string | null; // TODO: use udefined instead?
  decodedToken?: DecodedToken;
  userId: number; // TODO: dont user -1 as undefined user
  members: Membre[]; // TODO:should disapear when 'user' and 'membre' tables will be merged
}

// -------------------------------- Reducer --------------------------------
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    decodedToken: undefined,
    userId: defaultMember.id,
    members: [],
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private store: Store) {}

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    return this.authService.login(action.payload).pipe(
      tap((token) => {
        const decodedToken = decodeToken(token);

        ctx.setState({
          token: token,
          decodedToken,
          userId: -1,
          members: [],
        });
      }),
      catchError((error) => {
        // TODO: display the user why he can't login: wrong password?
        return throwError(() => error);
      })
    );
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      decodedToken: undefined,
      userId: -1,
      members: [],
    });
    this.store.dispatch(new Navigate(['/login']));
  }

  @Action(AuthActions.GetMembers)
  getAllMembers(ctx: StateContext<AuthStateModel>) {
    return this.authService.getMembers().pipe(
      tap((members) => ctx.patchState({ members })),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  @Action(AuthActions.SetUserId)
  setUser(ctx: StateContext<AuthStateModel>, action: AuthActions.SetUserId) {
    ctx.patchState({
      userId: action.userId,
    });
  }
}

// -------------------------------- Selectors --------------------------------

export class AuthSelectors {
  static slices = createPropertySelectors<AuthStateModel>(AuthState);

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector([AuthState])
  static user(state: AuthStateModel): Membre | undefined {
    return state.members.find((member) => member.id === state.userId);
  }

  @Selector([AuthSelectors.slices.token, AuthSelectors.user])
  static isAuthenticated(token: string, user: Membre): boolean {
    return !!token && !!user;
  }
}
