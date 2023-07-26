import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SaidaServiceCreate, SaidaServiceEdit, FinanceiroSaida } from 'src/app/core/interface/financeiro/financeiro-saida.model';
import * as moment from 'moment';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { FinanceiroSaidaService } from 'src/app/api/financeiro/financeiro-saida.service';

@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.scss']
})
export class SaidasComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  titulo = '';
  descricaoBotao = '';

  saida: FinanceiroSaida = {
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
    private _financeiroSaidaService: FinanceiroSaidaService,
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
      this.titulo = 'Cadastrar Saida';
      this.descricaoBotao = 'Cadastrar';
    } else if(id){
      this.titulo = 'Editar Saida';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';

      this.sub.push(
        this._financeiroSaidaService.retornaSaidaPorId(+id).subscribe(saida => {
          Object.assign(this.saida, saida);
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
        this._financeiroSaidaService.editaSaida(dadosEnvio as SaidaServiceEdit, Number(id)).subscribe(saida => {
          this._snackBarService.showMessage('Saida alterada com sucesso!');
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
      this._financeiroSaidaService.criaSaida(dadosEnvio as SaidaServiceCreate).subscribe(saida => {
        this._snackBarService.showMessage('Saida cadastrada com sucesso!');
        this.router.navigate(['financeiro']);
        return;
      })
    );
  }

  cancela() {
    this.router.navigate(['financeiro/2']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
