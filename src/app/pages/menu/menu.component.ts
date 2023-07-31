import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from 'src/app/core/interface/menu/menu.model';
import { DadosUsuarioService } from 'src/app/core/services/dados-usuario.service';
import { PermissaoService } from 'src/app/core/services/permissao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  itensMenu: ItemMenu[] = [
    {
      descricao: 'Meu Cadastro',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'minhaConta'
    },
    {
      descricao: 'Calendário',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'noticias'
    },
    {
      descricao: 'Cadastro de Usuarios',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'usuarios'
    },
    {
      descricao: 'Financeiro',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'financeiro'
    },
    {
      descricao: 'Palavra Semestral',
      permissaoNecessaria: [1],
      icon: '',
      endpoint: 'palavra-semestral'
    },
    {
      descricao: 'Lista de Eventos',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'eventos'
    },
    {
      descricao: 'Relatório de Presença',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'eventos/relatorio/presenca'
    },
    {
      descricao: 'Orientações Ritualisticas',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'orientacoes-ritualisticas'
    },
    {
      descricao: 'Fotos de Eventos',
      permissaoNecessaria: [1],
      icon: '',
      endpoint: 'fotos/pasta'
    },
  ];

  constructor(
    private _permissaoService: PermissaoService,
    private router: Router,
    private _dadosUsuarioService: DadosUsuarioService
  ) { }

  ngOnInit(): void {
    this.filtraItensSemPermissao();
  }

  filtraItensSemPermissao(){
    this.itensMenu = this.itensMenu.filter(item => this._permissaoService.validaPermissaoRotina(item.permissaoNecessaria));
    return;
  }

  redirecionaBotao(endpoint: string){

    if(endpoint === 'minhaConta'){
      this.router.navigate(['/usuarios/edit/' + this._dadosUsuarioService.pegaDadosUsuario()?.id], { queryParams: { minhaConta: 'true' } });
      return;
    }

    this.router.navigate([endpoint]);
    return;
  }

}
