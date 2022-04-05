import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'ground',
    loadChildren: () => import('./ground/ground.module').then(module => module.GroundModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./contract/contract.module').then(module => module.ContractModule)
  }
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
