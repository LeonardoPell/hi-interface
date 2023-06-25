import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrientacoesRitualisticasRoutingModule } from './orientacoes-ritualisticas-routing.module';
import { OrientacoesRitualisticasViewComponent } from './orientacoes-ritualisticas-view/orientacoes-ritualisticas-view.component';
import { OrientacoesRitualisticasReadComponent } from './orientacoes-ritualisticas-read/orientacoes-ritualisticas-read.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrientacoesRitualisticasViewComponent,
    OrientacoesRitualisticasReadComponent
  ],
  imports: [
    CommonModule,
    OrientacoesRitualisticasRoutingModule,
    MaterialModule,
    FiltroTabelaModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OrientacoesRitualisticasModule { }
