import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroundListComponent} from './ground-list/ground-list.component';
import {GroundCreateComponent} from './ground-create/ground-create.component';
import {GroundEditComponent} from './ground-edit/ground-edit.component';
import {GroundDeleteComponent} from './ground-delete/ground-delete.component';
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {
    path: 'list', component: GroundListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'create', component: GroundCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'edit/:id', component: GroundEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'delete/:id', component: GroundDeleteComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroundRoutingModule {
}
