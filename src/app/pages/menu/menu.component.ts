import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from 'src/app/core/interface/menu/menu.model';
import { PermissaoService } from 'src/app/core/services/permissao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  itensMenu: ItemMenu[] = [
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
    }
  ];

  constructor(
    private _permissaoService: PermissaoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.filtraItensSemPermissao();
  }

  filtraItensSemPermissao(){
    this.itensMenu = this.itensMenu.filter(item => this._permissaoService.validaPermissaoRotina(item.permissaoNecessaria));
    return;
  }

  redirecionaBotao(endpoint: string){
    this.router.navigate([endpoint]);
    return;
  }

}
