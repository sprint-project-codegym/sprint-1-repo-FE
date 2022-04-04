import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {ContractListComponent} from './contract-list/contract-list.component';
import {ContractEditComponent} from './contract-edit/contract-edit.component';
import {ContractDeleteComponent} from './contract-delete/contract-delete.component';
import {HttpClientModule} from '@angular/common/http';
import {ContractCreateComponent} from './contract-create/contract-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ContractListComponent, ContractEditComponent, ContractDeleteComponent, ContractCreateComponent],
  exports: [
    ContractCreateComponent,
    ContractListComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ContractModule { }


