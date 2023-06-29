import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { defaultMember } from 'src/app/models/api.model';
import { AuthActions, AuthSelectors } from 'src/app/state/auth.state';
import { CinePsActions } from 'src/app/state/cineps.actions';
import { getExpirationDate } from 'src/app/utils/services.utils';
import { SubscriptionCleaner } from 'src/app/utils/subscription-cleaner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscriptionCleaner {

  // init login form
  credentials = {
    email: "",
    password: ""
  };

  // init user select field
  defaultMember = defaultMember;

  hasToken$ = this.store.select(AuthSelectors.slices.token);
  isAuthenticated$ = this.store.select(AuthSelectors.isAuthenticated);

  membres$ = this.store.select(AuthSelectors.slices.members);

  userId: number = defaultMember.id;



  constructor(
    private store: Store
  ) { super(); }

  ngOnInit() {
    // refresh selected user in list 
    this.store.select(AuthSelectors.slices.userId).pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(userId => {
      this.userId = userId;
    })

  }

  login(): void {
    this.store.dispatch(new AuthActions.Login(this.credentials));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  selectMember() {
    this.store.dispatch(new AuthActions.SetUserId(this.userId));
  }

}


