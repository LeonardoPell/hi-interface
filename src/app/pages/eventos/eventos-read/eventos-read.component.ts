import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventoService } from 'src/app/api/eventos/eventos.model';
import { Evento } from 'src/app/core/interface/evento/evento.model';
import * as moment from 'moment';
import { PermissaoService } from 'src/app/core/services/permissao.service';

@Component({
  selector: 'app-eventos-read',
  templateUrl: './eventos-read.component.html',
  styleUrls: ['./eventos-read.component.scss']
})
export class EventosReadComponent implements OnInit, OnDestroy {

  filtroNaoEncontrado = '';
  permissaoCadastro = false;

  sub: Subscription[] = [];

  displayedColumns = [
    'codigo',
    'titulo',
    'data',
    'hora',
    'acao'
  ];

  todosEventos: Evento[] = [];

  listaEventos: MatTableDataSource<Evento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private _eventoService: EventoService,
    private _permissaoService: PermissaoService,
  ) { }

  ngOnInit(): void {

    if(this._permissaoService.validaPermissaoRotina([1,5,7])){
      this.permissaoCadastro = true;
    }

    this.sub.push(
      this._eventoService.retornaListaEventos().subscribe(eventos => {
        eventos.map(evento => {
          evento.data = this.formataDataHora(String(evento.data_hora_reuniao));
          evento.hora = this.formataHora(String(evento.data_hora_reuniao));
        });
        this.atualizaValoresMatTable(eventos);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  selectEvento(id: number) {
    if(this._permissaoService.validaPermissaoRotina([1,5,7])){
      this.router.navigate(['/eventos/edit/' + id]);
      return;
    }
    return;
  }

  cadastrarPresenca(id: number){
    if(this._permissaoService.validaPermissaoRotina([1,5,7])){
      this.router.navigate(['/eventos/presenca/' + id]);
      return;
    }
    return;
  }

  atualizaValoresMatTable(lista: Evento[]) {
    this.listaEventos = new MatTableDataSource(lista);
    this.listaEventos.sort = this.sort;
    this.listaEventos.paginator = this.paginator;
  }

  formataDataHora(data: string){
    if(!data){
      return 'N/A';
    }
    moment.locale('pt-br');
    return moment(data).format('DD/MM/YYYY');
  }

  formataHora(data: string){
    if(!data){
      return 'N/A';
    }
    moment.locale('pt-br');
    return moment(data).format('LT');
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
