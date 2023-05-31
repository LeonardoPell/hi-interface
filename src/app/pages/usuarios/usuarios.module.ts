import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { UsuarioReadComponent } from './usuario-read/usuario-read.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FiltroTabelaModule } from 'src/app/components/filtro-tabela/filtro-tabela.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '@myndmanagement/text-mask';


@NgModule({
  declarations: [
    UsuarioViewComponent,
    UsuarioReadComponent,
    UsuarioFormComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    FiltroTabelaModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ]
})
export class UsuariosModule { }
