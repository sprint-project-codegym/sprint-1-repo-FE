import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [CustomerListComponent, CustomerDeleteComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
