import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastaViewComponent } from './pasta-view/pasta-view.component';
import { PastaFormComponent } from './pasta-form/pasta-form.component';

const routes: Routes = [
  {
    path: 'pasta', component: PastaViewComponent
  },
  {
    path: 'pasta/create', component: PastaFormComponent
  },
  {
    path: 'pasta/edit/:id', component: PastaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotosRoutingModule { }
