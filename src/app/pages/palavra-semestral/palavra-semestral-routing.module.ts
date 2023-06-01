import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PalavraSemestralFormComponent } from './palavra-semestral-form/palavra-semestral-form.component';

const routes: Routes = [
  {
    path: '', component: PalavraSemestralFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalavraSemestralRoutingModule { }
