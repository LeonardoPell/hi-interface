import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastaViewComponent } from './pasta-view/pasta-view.component';
import { PastaFormComponent } from './pasta-form/pasta-form.component';
import { FotosFormComponent } from './fotos-form/fotos-form.component';
import { FotosViewComponent } from './fotos-view/fotos-view.component';

const routes: Routes = [
  {
    path: ':pasta', component: FotosViewComponent
  },
  {
    path: 'create/:pasta', component: FotosFormComponent
  },
  {
    path: 'edit/:id', component: FotosFormComponent
  },
  {
    path: 'pasta/lista', component: PastaViewComponent
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
