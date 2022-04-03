import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FloorListComponent} from "./floor-list/floor-list.component";
import {FloorDeleteComponent} from "./floor-delete/floor-delete.component";


const routes: Routes = [
  {
    path: 'list', component: FloorListComponent
  },
  {
    path: 'delete/:id', component: FloorDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorRoutingModule { }
