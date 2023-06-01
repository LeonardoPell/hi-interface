import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PalavraSemestralRoutingModule } from './palavra-semestral-routing.module';
import { PalavraSemestralFormComponent } from './palavra-semestral-form/palavra-semestral-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PalavraSemestralFormComponent
  ],
  imports: [
    CommonModule,
    PalavraSemestralRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PalavraSemestralModule { }
