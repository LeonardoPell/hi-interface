import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { HeaderInicialComponent } from './components/header-inicial/header-inicial.component';
import { FooterInicialComponent } from './components/footer-inicial/footer-inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptors';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavBarComponent } from './components/sidenav-bar/sidenav-bar.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { HomeLogadoComponent } from './pages/home-logado/home-logado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicialComponent,
    HeaderInicialComponent,
    FooterInicialComponent,
    LoginComponent,
    LoadingComponent,
    SidenavComponent,
    SidenavBarComponent,
    NoticiasComponent,
    HomeLogadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
