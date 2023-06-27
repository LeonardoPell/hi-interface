import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EventoService } from 'src/app/api/eventos/eventos.model';
import { DadosRelatorioEvento, DadosUsuarioRelatorioEvento } from 'src/app/core/interface/evento/evento.model';

@Component({
  selector: 'app-eventos-relatorio-presenca',
  templateUrl: './eventos-relatorio-presenca.component.html',
  styleUrls: ['./eventos-relatorio-presenca.component.scss']
})
export class EventosRelatorioPresencaComponent implements OnInit, OnDestroy {

  filtroNaoEncontrado = '';
  permissaoCadastro = false;

  sub: Subscription[] = [];

  displayedColumns = [
    'nome',
    'nEventosParticipados',
    'nEventosTotais',
    'presenca'
  ];

  todosDadosRelatorio: DadosRelatorioEvento;

  listaDadosRelatorio: MatTableDataSource<DadosUsuarioRelatorioEvento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _eventoService: EventoService,
  ) { }

  ngOnInit(): void {
    this.sub.push(
      this._eventoService.retornaDadosRelatorioPresenca().subscribe((dadosRelatorio: DadosRelatorioEvento) => {
        this.todosDadosRelatorio = dadosRelatorio;
        this.atualizaValoresMatTable(dadosRelatorio.dadosUsuarios);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  selectEvento(id: number) {
    return;
  }

  atualizaValoresMatTable(lista: DadosUsuarioRelatorioEvento[]) {
    this.listaDadosRelatorio = new MatTableDataSource(lista);
    this.listaDadosRelatorio.sort = this.sort;
    this.listaDadosRelatorio.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
