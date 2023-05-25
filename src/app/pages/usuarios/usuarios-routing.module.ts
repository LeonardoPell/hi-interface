import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioReadComponent } from './usuario-read/usuario-read.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  {path: '', component: UsuarioReadComponent},
  {path: 'create', component: UsuarioFormComponent},
  {path: 'edit/:id', component: UsuarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
