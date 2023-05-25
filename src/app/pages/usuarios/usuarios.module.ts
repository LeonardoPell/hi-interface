import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';
import { UsuarioReadComponent } from './usuario-read/usuario-read.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';


@NgModule({
  declarations: [
    UsuarioViewComponent,
    UsuarioReadComponent,
    UsuarioFormComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
