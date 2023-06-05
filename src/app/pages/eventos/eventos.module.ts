import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosViewComponent } from './eventos-view/eventos-view.component';
import { EventosReadComponent } from './eventos-read/eventos-read.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventosViewComponent,
    EventosReadComponent,
    EventosFormComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    MaterialModule,
    FiltroTabelaModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EventosModule { }
