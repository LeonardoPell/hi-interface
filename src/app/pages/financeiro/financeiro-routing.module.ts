import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasComponent } from './entradas/entradas.component';
import { FinanceiroDataComponent } from './financeiro-data/financeiro-data.component';

const routes: Routes = [
  {
    path: ':tipo', component: FinanceiroDataComponent
  },
  {
    path: 'entrada/create/:ano/:mes', component: EntradasComponent
  },
  {
    path: 'entrada/edit/:id', component: EntradasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
