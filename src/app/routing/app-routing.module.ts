import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../components/accueil/accueil.component';
import { LoginComponent } from '../components/layout/login/login.component';
import { DebugComponent } from '../components/debug/debug.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from '../components/layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      // { path: '', redirectTo: '/accueil', pathMatch: 'full' },
      { path: 'accueil', component: AccueilComponent },
      { path: 'debug', component: DebugComponent },
      { path: 'admin', component: AdminComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

const config = { 
  // useHash: true, 
  // enableTracing: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
