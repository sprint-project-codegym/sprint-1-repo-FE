import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContractListComponent} from './contract-list/contract-list.component';
import {ContractEditComponent} from './contract-edit/contract-edit.component';
import {ContractDeleteComponent} from './contract-delete/contract-delete.component';
import {ContractCreateComponent} from './contract-create/contract-create.component';
import {GroundListComponent} from "../ground/ground-list/ground-list.component";
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {
    path: 'list', component: ContractListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'create', component: ContractCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'edit/:id', component: ContractEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'delete/:id', component: ContractDeleteComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {
}
