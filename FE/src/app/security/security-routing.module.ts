import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {SecurityResetPasswordComponent} from './security-reset-password/security-reset-password.component';
import {SecurityVerificationComponent} from './security-verification/security-verification.component';
import {SecurityVerifyResetPasswordComponent} from './security-verify-reset-password/security-verify-reset-password.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


const routes: Routes = [
  {path: 'login', component: SecurityLoginComponent},
  {path: 'verification', component: SecurityVerificationComponent},
  {path: 'reset-password', component: SecurityResetPasswordComponent},
  {path: 'verify-reset-password', component: SecurityVerifyResetPasswordComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
