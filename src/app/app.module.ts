import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppComponent } from './app.component';
import { AngularComponent } from './components/angular/angular.component';

import { AccueilComponent } from './components/accueil/accueil.component';
import { InitAppComponent } from './components/layout/init-app/init-app.component';
import { LoginComponent } from './components/layout/login/login.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { DebugComponent } from './components/debug/debug.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { CinePsState } from './state/cineps.state';
import { env } from './environment/environment';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthState } from './state/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { MessagesComponent } from './components/layout/messages/messages.component';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ProposeComponent } from './components/proposeur/propose/propose.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { SetupPsEventComponent } from './components/setup-ps-event/setup-ps-event.component';
import { ProposeurViewComponent } from './components/proposeur/proposeur-view/proposeur-view.component';
import { VoterViewComponent } from './components/voter/voter-view/voter-view.component';
import { ResultViewComponent } from './components/result-view/result-view.component';
import { VoteComponent } from './components/voter/vote/vote.component';
import { CountdownComponent } from './components/countdown/countdown.component';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    AngularComponent,
    MessagesComponent,
    AccueilComponent,
    InitAppComponent,
    LoginComponent,
    NavComponent,
    DebugComponent,
    AdminComponent,
    VoteComponent,
    PageNotFoundComponent,
    ProposeComponent,
    AddMemberComponent,
    SetupPsEventComponent,
    ProposeurViewComponent,
    VoterViewComponent,
    ResultViewComponent,
    CountdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, CinePsState], {
      developmentMode: !env.production,
    }),
    NgxsStoragePluginModule.forRoot({ key: 'auth' }),
    NgxsRouterPluginModule.forRoot(),
    env.plugins,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
