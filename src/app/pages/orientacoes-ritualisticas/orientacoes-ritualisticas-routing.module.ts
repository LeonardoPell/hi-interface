import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientacoesRitualisticasViewComponent } from './orientacoes-ritualisticas-view/orientacoes-ritualisticas-view.component';
import { OrientacoesRitualisticasFormComponent } from './orientacoes-ritualisticas-form/orientacoes-ritualisticas-form.component';

const routes: Routes = [
  {path: '', component: OrientacoesRitualisticasViewComponent},
  {path: 'create', component: OrientacoesRitualisticasFormComponent},
  {path: 'edit/:id', component: OrientacoesRitualisticasFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrientacoesRitualisticasRoutingModule { }
