import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financeiro-data-anual',
  templateUrl: './financeiro-data-anual.component.html',
  styleUrls: ['./financeiro-data-anual.component.scss']
})
export class FinanceiroDataAnualComponent implements OnInit {

  titulo = 'Selecione uma data';
  descricaoBotao = 'Selecionar';
  tipo = '';

  anoSelecionado: number;
  mesSelecionado: number;
  anos: number[];

  formBasico: FormGroup = this.fb.group({
    ano: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const tipo = this.route.snapshot.paramMap.get('tipo');
    this.anoSelecionado = new Date().getFullYear();
    this.anos = this.getAnosDisponiveis();

    if(Number(tipo) === 1){
      this.titulo += ' de entrada';
      this.tipo = 'entrada';
    }else if(Number(tipo) === 2){
      this.titulo += ' de saida';
      this.tipo = 'saida';
    }else{
      this.titulo += ' de relação entrada saida';
      this.tipo = 'relacao';
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

    if(this.tipo === 'relacao'){
      const endpoint = `financeiro/relatorio/anual/entrada/${ano}/relacao/1`;
      this.router.navigate([endpoint]);
      return;
    }
    
    const endpoint = `financeiro/relatorio/anual/${this.tipo}/${ano}`;
    this.router.navigate([endpoint]);
    return;
  }

  cancela(){
    this.router.navigate(['financeiro']);
    return;
  }

}
