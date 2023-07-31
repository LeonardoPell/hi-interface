import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotosRoutingModule } from './fotos-routing.module';
import { PastaFormComponent } from './pasta-form/pasta-form.component';
import { PastaReadComponent } from './pasta-read/pasta-read.component';
import { PastaViewComponent } from './pasta-view/pasta-view.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FotosReadComponent } from './fotos-read/fotos-read.component';
import { FotosViewComponent } from './fotos-view/fotos-view.component';
import { FotosFormComponent } from './fotos-form/fotos-form.component';


@NgModule({
  declarations: [
    PastaFormComponent,
    PastaReadComponent,
    PastaViewComponent,
    FotosReadComponent,
    FotosViewComponent,
    FotosFormComponent
  ],
  imports: [
    CommonModule,
    FotosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FiltroTabelaModule,
    FormsModule,
  ]
})
export class FotosModule { }
