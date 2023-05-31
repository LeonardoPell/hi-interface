import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/account/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { HomeLogadoComponent } from './pages/home-logado/home-logado.component';
import { HistoriaHiramComponent } from './pages/historia-hiram/historia-hiram.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLogadoComponent,
    children: [
      {
        path: '',
        redirectTo: 'noticias',
        pathMatch: 'full'
      },
      {
        path: 'noticias', component: NoticiasComponent
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicial',
        pathMatch: 'full'
      },
      {
        path: 'inicial', component: InicialComponent
      },
      {
        path: 'historia-hiram', component: HistoriaHiramComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
