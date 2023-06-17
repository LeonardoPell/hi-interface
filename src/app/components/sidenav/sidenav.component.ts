import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosUsuario } from 'src/app/core/interface/usuario/dadosUsuario.model';
import { DadosUsuarioService } from 'src/app/core/services/dados-usuario.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  dadosUsuario!: DadosUsuario;

  constructor(private router: Router, private _dadosUsuarioService: DadosUsuarioService) { }

  ngOnInit(): void {
    this.dadosUsuario = this._dadosUsuarioService.pegaDadosUsuario();
  }

  meuPerfil(){
    this.router.navigate(['/usuarios/edit/' + this._dadosUsuarioService.pegaDadosUsuario()?.id], { queryParams: { minhaConta: 'true' } });
    return;
  }

  deslogar() {
    localStorage.clear();
    location.reload();
    this.router.navigate(['login']);
    return;
  }

}
