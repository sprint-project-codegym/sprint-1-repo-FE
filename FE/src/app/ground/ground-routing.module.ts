import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroundListComponent} from './ground-list/ground-list.component';
import {GroundCreateComponent} from './ground-create/ground-create.component';
import {GroundEditComponent} from './ground-edit/ground-edit.component';
import {GroundDeleteComponent} from './ground-delete/ground-delete.component';


const routes: Routes = [
  {
    path: 'list', component: GroundListComponent
  },
  {
    path: 'add', component: GroundCreateComponent
  },
  {
    path: 'edit/:id', component: GroundEditComponent
  },
  {
    path: 'delete/:id', component: GroundDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroundRoutingModule {
}
