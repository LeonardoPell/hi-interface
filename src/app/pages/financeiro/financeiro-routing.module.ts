import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasComponent } from './entradas/entradas.component';
import { FinanceiroDataComponent } from './financeiro-data/financeiro-data.component';
import { SaidasComponent } from './saidas/saidas.component';
import { FinanceiroOpcoesComponent } from './financeiro-opcoes/financeiro-opcoes.component';
import { RelatorioMensalComponent } from './relatorio-mensal/relatorio-mensal.component';

const routes: Routes = [
  {
    path: '', component: FinanceiroOpcoesComponent
  },
  {
    path: ':tipo', component: FinanceiroDataComponent
  },
  {
    path: 'relatorio/mensal/:tipo/:ano/:mes', component: RelatorioMensalComponent
  },
  {
    path: ':tipo/:relatorio', component: FinanceiroDataComponent
  },
  {
    path: 'entrada/create/:ano/:mes', component: EntradasComponent
  },
  {
    path: 'entrada/edit/:id', component: EntradasComponent
  },
  {
    path: 'saida/create/:ano/:mes', component: SaidasComponent
  },
  {
    path: 'saida/edit/:id', component: SaidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
