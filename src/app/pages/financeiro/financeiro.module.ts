import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { BalanceteComponent } from './balancete/balancete.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BalanceteComponent
  ],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    MaterialModule,
    FiltroTabelaModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FinanceiroModule { }
