import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Evento } from 'src/app/core/interface/evento/evento.model';
import * as moment from 'moment';
import { EventoService } from 'src/app/api/eventos/eventos.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-balancete',
  templateUrl: './balancete.component.html',
  styleUrls: ['./balancete.component.scss']
})
export class BalanceteComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  titulo = 'Balancete';
  descricaoBotao = 'Salvar';

  balancete: any = {
    aluguel: 0,
    gob_mg: 0
  };

  formBasico: FormGroup = this.fb.group({
    aluguel: [0, []],
    gob_mg: [0, []],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _eventoService: EventoService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    
  }

  envia(){
    

  }

  cancela() {
    this.router.navigate(['balancete']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
