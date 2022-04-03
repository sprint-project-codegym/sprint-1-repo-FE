import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeChangePasswordComponent} from './employee-change-password/employee-change-password.component';
import {EmployeeAccountDetailComponent} from './employee-account-detail/employee-account-detail.component';


const routes: Routes = [
  {
    path: 'list', component: EmployeeListComponent
  },
  {
    path: 'add', component: EmployeeCreateComponent
  },
  {
    path: 'edit/:id', component: EmployeeEditComponent
  },
  {
    path: 'delete/:id', component: EmployeeDeleteComponent
  },
  {
    path: 'list/:id', component: EmployeeDetailComponent
  },
  {
    path: 'change-pw', component: EmployeeChangePasswordComponent
  },
  {
    path: 'acc-detail', component: EmployeeAccountDetailComponent
  },
  {
    path: 'change-pw/:id', component: EmployeeChangePasswordComponent
  },
  {
    path: 'acc-detail/:id', component: EmployeeAccountDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
