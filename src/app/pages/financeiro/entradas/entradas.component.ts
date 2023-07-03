import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FinanceiroEntradaService } from 'src/app/api/financeiro/financeiro-entrada.service';
import { EntradaServiceCreate, EntradaServiceEdit, FinanceiroEntrada } from 'src/app/core/interface/financeiro/financeiro-entrada.model';
import * as moment from 'moment';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  titulo = '';
  descricaoBotao = '';

  entrada: FinanceiroEntrada = {
    descricao: '',
    valor: 0,
    tipo: 3,
    data_pagamento: '',
    ativo: true
  }

  formBasico: FormGroup = this.fb.group({
    descricao: ['', Validators.required],
    valor: ['', Validators.required],
    tipo: [0, Validators.required],
    data_pagamento: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _financeiroEntradaService: FinanceiroEntradaService,
    private _snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    const ano = this.route.snapshot.paramMap.get('ano');
    const mes = this.route.snapshot.paramMap.get('mes');
    const id = this.route.snapshot.paramMap.get('id');

    if (ano && mes) {
      if(ano.length < 4){
        this.router.navigate(['financeiro']);
        return;
      }
      this.titulo = 'Cadastrar Entrada';
      this.descricaoBotao = 'Cadastrar';
    } else if(id){
      this.titulo = 'Editar Entrada';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';

      this.sub.push(
        this._financeiroEntradaService.retonaEntradaPorId(+id).subscribe(entrada => {
          Object.assign(this.entrada, entrada);
        })
      );
    }else{
      this.router.navigate(['financeiro']);
      return;
    }
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvio: any = {
      descricao: this.formBasico.value.descricao,
      valor: this.formBasico.value.valor,
      tipo: this.formBasico.value.tipo,
      data_pagamento: this.formBasico.value.data_pagamento,
      ativo: true
    };

    if(this.tipoFormulario == 'edita'){
      if(!dadosEnvio.data_pagamento){
        delete dadosEnvio.data_pagamento;
      }
      const id = this.route.snapshot.paramMap.get('id');
      this.sub.push(
        this._financeiroEntradaService.editaEntrada(dadosEnvio as EntradaServiceEdit, Number(id)).subscribe(entrada => {
          this._snackBarService.showMessage('Entrada alterada com sucesso!');
          this.router.navigate(['financeiro']);
          return;
        })
      );
      return;
    }

    const ano = this.route.snapshot.paramMap.get('ano');
    const mes = this.route.snapshot.paramMap.get('mes');
    dadosEnvio.ano_mes_pagamento = moment(`${ano}-${Number(mes).toString().padStart(2, '0')}`);

    this.sub.push(
      this._financeiroEntradaService.criaEntrada(dadosEnvio as EntradaServiceCreate).subscribe(entrada => {
        this._snackBarService.showMessage('Entrada cadastrada com sucesso!');
        this.router.navigate(['financeiro']);
        return;
      })
    );
  }

  cancela() {
    this.router.navigate(['financeiro']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
