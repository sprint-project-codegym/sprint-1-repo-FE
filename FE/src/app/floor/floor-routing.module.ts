import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FloorListComponent} from "./floor-list/floor-list.component";
import {FloorDeleteComponent} from "./floor-delete/floor-delete.component";
import {GroundListComponent} from "../ground/ground-list/ground-list.component";
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {
    path: 'list', component: FloorListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  },
  {
    path: 'delete/:id', component: FloorDeleteComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorRoutingModule { }
