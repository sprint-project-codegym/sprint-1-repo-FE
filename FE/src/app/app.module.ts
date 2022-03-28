import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import {EmployeeModule} from './employee/employee.module';
import {environment} from '../environments/environment';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Toast, ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EmployeeModule,
    //toast
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //toast
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
