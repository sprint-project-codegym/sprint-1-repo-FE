import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {SecurityResetPasswordComponent} from './security-reset-password/security-reset-password.component';
import {SecurityVerificationComponent} from './security-verification/security-verification.component';
import {SecurityVerifyResetPasswordComponent} from './security-verify-reset-password/security-verify-reset-password.component';


const routes: Routes = [
  {
    path: 'login', component: SecurityLoginComponent
  }
  // ,
  // {
  //   path: 'reset-pw', component: SecurityResetPasswordComponent
  // },
  // {
  //   path: 'verification', component: SecurityVerificationComponent
  // },
  // {
  //   path: 'verify-rs', component: SecurityVerifyResetPasswordComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
