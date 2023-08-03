import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FinanceiroEntradaService } from 'src/app/api/financeiro/financeiro-entrada.service';
import * as moment from 'moment';
import { FinanceiroSaidaService } from 'src/app/api/financeiro/financeiro-saida.service';
import { jsPDF } from 'jspdf';
import { LoadingService } from 'src/app/api/loading/loading.service';

@Component({
  selector: 'app-relatorio-anual',
  templateUrl: './relatorio-anual.component.html',
  styleUrls: ['./relatorio-anual.component.scss']
})
export class RelatorioAnualComponent implements OnInit, OnDestroy, AfterViewInit {

  sub: Subscription[] = [];

  descricaoValor = 'Valor Total';

  tipo: string;

  relacao = false;

  displayedColumns: string[] = ['descricao','valor','tipo','data_pagamento'];
  dataSource = [];

  valorTotal = 0;
  valorTotalEntrada = 0;
  valorTotalSaida = 0;

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
    const relacao = this.route.snapshot.paramMap.get('relacao');

    if (ano && tipo) {
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

    if(relacao){
      this.relacao = true;
      this.displayedColumns.push('relacao');
      this.displayedColumns.push('mes_pagamento');
    }
  }

  ngAfterViewInit(): void {
    this.geraDados();
  }

  geraDados(){
    const ano = this.route.snapshot.paramMap.get('ano');
    const tipo = this.route.snapshot.paramMap.get('tipo');
    const relacao = this.route.snapshot.paramMap.get('relacao');

    if(relacao){
      this._financeiroEntradaService.relacaoEntradaSaida(String(ano)).subscribe(dadosRelacao => {
        const dados: any = [];
        dadosRelacao.relatorio.entrada.relatorio.map((relacao: any) => {
          relacao.relacao = 'Entrada';
          dados.push(relacao);
        });
        dadosRelacao.relatorio.saida.relatorio.map((relacao: any) => {
          relacao.relacao = 'Saida';
          dados.push(relacao);
        });
        this.valorTotal = dadosRelacao.relatorio.dadosAdicionais.valorDiferenca;
        this.valorTotalEntrada = dadosRelacao.relatorio.entrada.dadosAdicionais.valorTotal;
        this.valorTotalSaida = dadosRelacao.relatorio.saida.dadosAdicionais.valorTotal;
        this.dataSource = dados;
        this.descricaoValor = 'Valor Diferença';
        this.tipo = 'relação entrada saida'
      })
      return;
    }

    if(tipo === 'entrada'){
      this.sub.push(
        this._financeiroEntradaService.retornaEntradaPorAno(String(ano)).subscribe(dadosEntrada => {
          this.dataSource = dadosEntrada.relatorio;
          this.valorTotal = dadosEntrada.dadosAdicionais.valorTotal;
        })
      );
    }else{
      this.sub.push(
        this._financeiroSaidaService.retornaSaidaPorAno(String(ano)).subscribe(dadosSaida => {
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
        pdf.save("relatorio.pdf");
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

  formataDataAnoMes(data: string){
    if(!data){
      return 'N/A';
    }
    return moment(data).format('MM/YYYY');
  }

  formataValor(valor: number){
    return `R$${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  mostraDataAtual(){
    const ano = this.route.snapshot.paramMap.get('ano');
    return moment(`${ano}-01-01`).format('YYYY');
  }

  cancelar(){
    this.router.navigate(['financeiro']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
