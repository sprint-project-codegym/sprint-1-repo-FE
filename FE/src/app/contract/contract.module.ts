import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractDeleteComponent } from './contract-delete/contract-delete.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ContractListComponent, ContractEditComponent, ContractDeleteComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ContractModule { }
