import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioViewComponent } from './usuario-view/usuario-view.component';

const routes: Routes = [
  {path: '', component: UsuarioViewComponent},
  {path: 'create', component: UsuarioFormComponent},
  {path: 'edit/:id', component: UsuarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
