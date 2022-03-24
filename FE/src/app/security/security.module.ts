import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityLoginComponent } from './security-login/security-login.component';
import { SecurityResetPasswordComponent } from './security-reset-password/security-reset-password.component';
import { SecurityVerificationComponent } from './security-verification/security-verification.component';
import { SecurityVerifyResetPasswordComponent } from './security-verify-reset-password/security-verify-reset-password.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [SecurityLoginComponent, SecurityResetPasswordComponent, SecurityVerificationComponent, SecurityVerifyResetPasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    HttpClientModule
  ]
})
export class SecurityModule { }
