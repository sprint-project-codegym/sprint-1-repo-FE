import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SecurityModule} from "./security/security.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {HomeComponent} from './component/home/home.component';
import {CommonModule} from '@angular/common';
import {NgxSpinnerModule} from "ngx-spinner";
import {EmployeeModule} from "./employee/employee.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AuthenErrorPageComponent} from "./authen-error-page/authen-error-page.component";
import {AuthInterceptor} from "./helpers/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthenErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    EmployeeModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: "increasing"
      }
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}
