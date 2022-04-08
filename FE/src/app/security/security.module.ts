import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecurityRoutingModule} from './security-routing.module';
import {SecurityLoginComponent} from './security-login/security-login.component';
import {SecurityResetPasswordComponent} from './security-reset-password/security-reset-password.component';
import {SecurityVerificationComponent} from './security-verification/security-verification.component';
import {SecurityVerifyResetPasswordComponent} from './security-verify-reset-password/security-verify-reset-password.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    SecurityLoginComponent,
    SecurityResetPasswordComponent,
    SecurityVerificationComponent,
    SecurityVerifyResetPasswordComponent,
    PageNotFoundComponent,
    ],
  exports: [
    SecurityLoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class SecurityModule {
}
