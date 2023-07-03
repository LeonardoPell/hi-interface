import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntradasComponent } from './entradas/entradas.component';


@NgModule({
  declarations: [
    EntradasComponent
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
