import { Component, Input, OnInit } from '@angular/core';
import { dadosMenu } from './data-menu';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { DadosUsuario } from 'src/app/core/interface/usuario/dadosUsuario.model';
import { DadosUsuarioService } from 'src/app/core/services/dados-usuario.service';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit {

  menuList: any[] = [];
  acessoMenuChildren: boolean[] = [];
  dadosUsuario: DadosUsuario;

  constructor(
    private _permissaoService: PermissaoService,
    private _dadosUsuarioService: DadosUsuarioService
  ) { }

  ngOnInit(): void {
    this.dadosUsuario = this._dadosUsuarioService.pegaDadosUsuario();
    dadosMenu.map((menu) => {
      if(menu?.children){
        menu.children.map((children: any) => {
          if(children?.nivelPermissao){
            if(!this._permissaoService.validaPermissaoRotina(children.nivelPermissao,Number(this.dadosUsuario.nivel_obreiro))){
              children.bloqueio = true;
            }
          }
        })
      }
      this.menuList.push(menu);
    });
  }

}
