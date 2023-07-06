import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financeiro-data',
  templateUrl: './financeiro-data.component.html',
  styleUrls: ['./financeiro-data.component.scss']
})
export class FinanceiroDataComponent implements OnInit {

  titulo = 'Selecione uma data';
  descricaoBotao = 'Selecionar';
  tipo = '';

  anoSelecionado: number;
  mesSelecionado: number;
  anos: number[];
  mes = [
    { nome: 'Janeiro', valor: 1 },
    { nome: 'Fevereiro', valor: 2 },
    { nome: 'Março', valor: 3 },
    { nome: 'Abril', valor: 4 },
    { nome: 'Maio', valor: 5 },
    { nome: 'Junho', valor: 6 },
    { nome: 'Julho', valor: 7 },
    { nome: 'Agosto', valor: 8 },
    { nome: 'Setembro', valor: 9 },
    { nome: 'Outubro', valor: 10 },
    { nome: 'Novembro', valor: 11 },
    { nome: 'Dezembro', valor: 12 }
  ];

  formBasico: FormGroup = this.fb.group({
    ano: ['', Validators.required],
    mes: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const tipo = this.route.snapshot.paramMap.get('tipo');
    this.anoSelecionado = new Date().getFullYear();
    this.mesSelecionado = (new Date().getMonth() + 1);
    this.anos = this.getAnosDisponiveis();

    if(Number(tipo) === 1){
      this.titulo += ' de entrada';
      this.tipo = 'entrada';
    }else{
      this.titulo += ' de saida';
      this.tipo = 'saida';
    }
  }

  getAnosDisponiveis(): number[] {
    const anoAtual = new Date().getFullYear();
    const anos = [];

    for (let ano = anoAtual; ano >= 2000; ano--) {
      anos.push(ano);
    }

    return anos;
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const ano = this.formBasico.value.ano;
    const mes = this.formBasico.value.mes;

    const endpoint = `financeiro/${this.tipo}/create/${ano}/${mes}`;
    console.log(endpoint);
    this.router.navigate([endpoint]);
    return;
  }

  cancela(){
    this.router.navigate(['financeiro']);
    return;
  }

}
