import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroTabelaComponent } from './filtro-tabela/filtro-tabela.component';
import { MaterialModule } from 'src/app/core/material/material.module';



@NgModule({
  declarations: [
    FiltroTabelaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [FiltroTabelaComponent]
})
export class FiltroTabelaModule { }
