import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorRoutingModule } from './floor-routing.module';
import { FloorListComponent } from './floor-list/floor-list.component';
import { FloorDeleteComponent } from './floor-delete/floor-delete.component';


@NgModule({
  declarations: [FloorListComponent, FloorDeleteComponent],
  imports: [
    CommonModule,
    FloorRoutingModule
  ]
})
export class FloorModule { }
