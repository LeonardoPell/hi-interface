import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/account/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeLogadoComponent } from './pages/home-logado/home-logado.component';
import { HistoriaHiramComponent } from './pages/historia-hiram/historia-hiram.component';
import { HistoriaMaconariaComponent } from './pages/historia-maconaria/historia-maconaria.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CalendarioInicialComponent } from './pages/calendario-inicial/calendario-inicial.component';
import { ExVeneraveisComponent } from './pages/ex-veneraveis/ex-veneraveis.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLogadoComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
      },
      {
        path: 'menu', component: MenuComponent
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
      {
        path: 'palavra-semestral',
        loadChildren: () =>
          import('./pages/palavra-semestral/palavra-semestral.module').then(
            (m) => m.PalavraSemestralModule
          ),
      },
      {
        path: 'eventos',
        loadChildren: () =>
          import('./pages/eventos/eventos.module').then(
            (m) => m.EventosModule
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
        path: 'historia-maconaria', component: HistoriaMaconariaComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'calendario', component: CalendarioInicialComponent
      },
      {
        path: 'ex-veneraveis', component: ExVeneraveisComponent
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
