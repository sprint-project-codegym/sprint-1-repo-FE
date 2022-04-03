import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeChangePasswordComponent} from './employee-change-password/employee-change-password.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeAccountDetailComponent} from './employee-account-detail/employee-account-detail.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeDeleteComponent, EmployeeCreateComponent,
    EmployeeDetailComponent, EmployeeEditComponent, EmployeeChangePasswordComponent,
    EmployeeAccountDetailComponent],
  exports: [
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class EmployeeModule {
}
