import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroundRoutingModule } from './ground-routing.module';
import { GroundListComponent } from './ground-list/ground-list.component';
import { GroundCreateComponent } from './ground-create/ground-create.component';
import { GroundDeleteComponent } from './ground-delete/ground-delete.component';
import { GroundEditComponent } from './ground-edit/ground-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [GroundListComponent, GroundCreateComponent, GroundDeleteComponent, GroundEditComponent],
    imports: [
        CommonModule,
        GroundRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class GroundModule { }
