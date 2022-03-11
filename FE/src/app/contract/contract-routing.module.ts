import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContractListComponent} from './contract-list/contract-list.component';
import {ContractEditComponent} from './contract-edit/contract-edit.component';
import {ContractDeleteComponent} from './contract-delete/contract-delete.component';


const routes: Routes = [
  {
    path: 'list', component: ContractListComponent
  },
  {
    path: 'edit/:id', component: ContractEditComponent
  },
  {
    path: 'delete/:id', component: ContractDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {
}
