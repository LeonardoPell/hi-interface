import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from 'src/app/core/interface/menu/menu.model';

@Component({
  selector: 'app-financeiro-opcoes',
  templateUrl: './financeiro-opcoes.component.html',
  styleUrls: ['./financeiro-opcoes.component.scss']
})
export class FinanceiroOpcoesComponent implements OnInit {

  itensMenu: ItemMenu[] = [
    {
      descricao: 'Cadastrar Entrada',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'financeiro/1'
    },
    {
      descricao: 'Cadastrar Saida',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'financeiro/2'
    },
    {
      descricao: 'Relatorio Mensal de Entrada',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'financeiro/1/mensal'
    },
    {
      descricao: 'Relatorio Mensal de Saida',
      permissaoNecessaria: [],
      icon: '',
      endpoint: 'financeiro/2/mensal'
    },
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  redirecionaBotao(endpoint: string){
    this.router.navigate([endpoint]);
    return;
  }

}
