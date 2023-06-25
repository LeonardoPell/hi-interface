import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientacoesRitualisticasViewComponent } from './orientacoes-ritualisticas-view/orientacoes-ritualisticas-view.component';

const routes: Routes = [
  {path: '', component: OrientacoesRitualisticasViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrientacoesRitualisticasRoutingModule { }
