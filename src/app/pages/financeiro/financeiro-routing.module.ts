import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasComponent } from './entradas/entradas.component';
import { FinanceiroDataComponent } from './financeiro-data/financeiro-data.component';
import { SaidasComponent } from './saidas/saidas.component';
import { FinanceiroOpcoesComponent } from './financeiro-opcoes/financeiro-opcoes.component';
import { RelatorioMensalComponent } from './relatorio-mensal/relatorio-mensal.component';
import { FinanceiroDataAnualComponent } from './financeiro-data-anual/financeiro-data-anual.component';
import { RelatorioAnualComponent } from './relatorio-anual/relatorio-anual.component';

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
    path: 'relatorio/anual/:tipo/:ano', component: RelatorioAnualComponent
  },
  {
    path: 'relatorio/anual/:tipo/:ano/relacao/:relacao', component: RelatorioAnualComponent
  },
  {
    path: ':tipo/:relatorio', component: FinanceiroDataComponent
  },
  {
    path: 'selecao/anual/:tipo', component: FinanceiroDataAnualComponent
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
