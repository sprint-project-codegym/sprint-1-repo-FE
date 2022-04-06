import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeChangePasswordComponent} from './employee-change-password/employee-change-password.component';
import {EmployeeAccountDetailComponent} from './employee-account-detail/employee-account-detail.component';
import {GroundListComponent} from "../ground/ground-list/ground-list.component";
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {
    path: 'list', component: EmployeeListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'add', component: EmployeeCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'edit/:id', component: EmployeeEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'delete/:id', component: EmployeeDeleteComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'list/:id', component: EmployeeDetailComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'change-pw', component: EmployeeChangePasswordComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'acc-detail', component: EmployeeAccountDetailComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'change-pw/:id', component: EmployeeChangePasswordComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'acc-detail/:id', component: EmployeeAccountDetailComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
