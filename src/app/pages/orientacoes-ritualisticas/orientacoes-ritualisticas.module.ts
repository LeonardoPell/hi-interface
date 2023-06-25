import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrientacoesRitualisticasRoutingModule } from './orientacoes-ritualisticas-routing.module';
import { OrientacoesRitualisticasViewComponent } from './orientacoes-ritualisticas-view/orientacoes-ritualisticas-view.component';
import { OrientacoesRitualisticasReadComponent } from './orientacoes-ritualisticas-read/orientacoes-ritualisticas-read.component';


@NgModule({
  declarations: [
    OrientacoesRitualisticasViewComponent,
    OrientacoesRitualisticasReadComponent
  ],
  imports: [
    CommonModule,
    OrientacoesRitualisticasRoutingModule
  ]
})
export class OrientacoesRitualisticasModule { }
