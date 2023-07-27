import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FinanceiroEntradaService } from 'src/app/api/financeiro/financeiro-entrada.service';
import * as moment from 'moment';
import { FinanceiroSaidaService } from 'src/app/api/financeiro/financeiro-saida.service';
import { jsPDF } from 'jspdf';
import { LoadingService } from 'src/app/api/loading/loading.service';

@Component({
  selector: 'app-relatorio-mensal',
  templateUrl: './relatorio-mensal.component.html',
  styleUrls: ['./relatorio-mensal.component.scss']
})
export class RelatorioMensalComponent implements OnInit, OnDestroy, AfterViewInit {

  sub: Subscription[] = [];

  tipo: string;

  displayedColumns: string[] = ['descricao','valor','tipo','data_pagamento'];
  dataSource = [];

  valorTotal = 0;

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _financeiroEntradaService: FinanceiroEntradaService,
    private _financeiroSaidaService: FinanceiroSaidaService,
    private loadingService: LoadingService
  ) { }
 
  ngOnInit(): void {
    const tipo = this.route.snapshot.paramMap.get('tipo');
    const ano = this.route.snapshot.paramMap.get('ano');
    const mes = this.route.snapshot.paramMap.get('mes');
    if (ano && mes && tipo) {
      this.tipo = tipo;
      if(ano.length < 4){
        this.router.navigate(['financeiro']);
        return;
      }
      this.geraDados();
    }else{
      this.router.navigate(['financeiro']);
      return;
    }
  }

  ngAfterViewInit(): void {
    this.geraDados();
  }

  geraDados(){
    const ano = this.route.snapshot.paramMap.get('ano');
    const mes = this.route.snapshot.paramMap.get('mes');
    const tipo = this.route.snapshot.paramMap.get('tipo');

    if(tipo === 'entrada'){
      this.sub.push(
        this._financeiroEntradaService.retornaEntradaPorMes(String(mes),String(ano)).subscribe(dadosEntrada => {
          this.dataSource = dadosEntrada.relatorio;
          this.valorTotal = dadosEntrada.dadosAdicionais.valorTotal;
        })
      );
    }else{
      this.sub.push(
        this._financeiroSaidaService.retornaSaidaPorMes(String(mes),String(ano)).subscribe(dadosSaida => {
          this.dataSource = dadosSaida.relatorio;
          this.valorTotal = dadosSaida.dadosAdicionais.valorTotal;
        })
      );
    }
    return;
  }

  geraPdf(){
    this.loadingService.show();
    const doc = new jsPDF('l','pt','a3');
    doc.html(this.el.nativeElement, {
      callback: pdf => {
        pdf.save("teste.pdf");
        this.loadingService.hide();
      }
    });
  }

  formataTipo(tipo: number){
    switch(tipo){
      case 1:
        return 'Anuidade';
      case 2:
        return 'Tronco de Beneficência';
      case 3:
        return 'Outros';
    }

    return '';
  }

  formataData(data: string){
    if(!data){
      return 'N/A';
    }
    return moment(data).format('DD/MM/YYYY');
  }

  formataValor(valor: number){
    return `R$${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  mostraDataAtual(){
    const ano = this.route.snapshot.paramMap.get('ano');
    const mes = this.route.snapshot.paramMap.get('mes');
    return moment(`${ano}-${mes}-01`).format('MM/YYYY');
  }

  cancelar(){
    this.router.navigate(['financeiro']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
