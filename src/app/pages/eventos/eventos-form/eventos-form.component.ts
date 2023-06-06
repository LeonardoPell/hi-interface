import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Evento } from 'src/app/core/interface/evento/evento.model';
import * as moment from 'moment';
import { EventoService } from 'src/app/api/eventos/eventos.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-eventos-form',
  templateUrl: './eventos-form.component.html',
  styleUrls: ['./eventos-form.component.scss']
})
export class EventosFormComponent implements OnInit, OnDestroy  {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  titulo = '';
  descricaoBotao = '';

  evento: Evento = {
    titulo: '',
    descricao: '',
    data: '',
    hora: ''
  };

  formBasico: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    data: ['', [Validators.required]],
    hora: ['', [Validators.required]],
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

    if (!id) {
      this.titulo = 'Cadastrar Evento';
      this.descricaoBotao = 'Cadastrar';
    } else {
      this.titulo = 'Editar Evento';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';

      this.sub.push(
        this._eventoService.retornaEventoPorId(Number(id)).subscribe(evento => {
          evento.data = evento.data_hora_reuniao;
          evento.hora = moment(evento.data_hora_reuniao).format('LT');
          Object.assign(this.evento,evento);
          this.formBasico.controls['data'].setValue(evento.data_hora_reuniao);
          this.formBasico.controls['hora'].setValue(evento.hora);
        })
      );
    }
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const data = moment(this.formBasico.value.data).format('YYYY-MM-DD');
    const data_hora_reuniao = moment(`${data} ${this.formBasico.value.hora}`).format();

    const dadosEnvio = {
      titulo: this.formBasico.value.titulo,
      descricao: this.formBasico.value.descricao,
      data_hora_reuniao
    };

    if(this.tipoFormulario === 'edita'){
      const id = this.route.snapshot.paramMap.get('id');
      this.sub.push(
        this._eventoService.editaEvento(dadosEnvio,Number(id)).subscribe(evento => {
          this._snackBarService.showMessage('Evento editado com sucesso!');
          this.router.navigate(['eventos']);
        })
      );
      return;
    }

    this.sub.push(
      this._eventoService.cadastraEvento(dadosEnvio).subscribe(evento => {
        this._snackBarService.showMessage('Evento cadastrado com sucesso!');
        this.router.navigate(['eventos']);
      })
    );

  }

  cancela() {
    this.router.navigate(['eventos']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
