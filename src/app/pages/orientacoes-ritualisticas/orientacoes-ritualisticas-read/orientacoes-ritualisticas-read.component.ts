import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrientacaoRitualisticaService } from 'src/app/api/orientacao-ritualistica/orientacao-ritualistica.model';
import { OrientacaoRitualistica } from 'src/app/core/interface/orientacao-ritualistica/orientacao-ritualistica.model';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-orientacoes-ritualisticas-read',
  templateUrl: './orientacoes-ritualisticas-read.component.html',
  styleUrls: ['./orientacoes-ritualisticas-read.component.scss']
})
export class OrientacoesRitualisticasReadComponent implements OnInit, OnDestroy {

  filtroNaoEncontrado = '';
  permissaoCadastro = false;

  sub: Subscription[] = [];

  displayedColumns = [
    'codigo',
    'documento',
    'visualizar',
    'acao'
  ];

  todosDocumentos: OrientacaoRitualistica[] = [];

  listaDocumentos: MatTableDataSource<OrientacaoRitualistica>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private _orientacaoRitualisticaService: OrientacaoRitualisticaService,
    private _permissaoService: PermissaoService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    if(this._permissaoService.validaPermissaoRotina([1])){
      this.permissaoCadastro = true;
    }

    this.sub.push(
      this._orientacaoRitualisticaService.retornaListaDeDocumentos().subscribe(documentos => {
        this.atualizaValoresMatTable(documentos);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  selectArquivo(id: string) {
    if(this._permissaoService.validaPermissaoRotina([1])){
      this.router.navigate(['/orientacoes-ritualisticas/edit/' + id]);
      return;
    }
    return;
  }

  visualizaArquivo(url: string){
    window.open(url, '_blank');
    return;
  }

  inativaDocumento(id: string){
      if(!this._permissaoService.validaPermissaoRotina([1])){
        this._snackBarService.showMessage('Você não tem permissão para realizar esta ação!',true);
        return;
      }
      this.sub.push(
        this._orientacaoRitualisticaService.editaDocumento(
          {
            ativo: false
          },
          Number(id)
        ).subscribe(orientacao => {
          this._snackBarService.showMessage('Documento excluido com sucesso!');
          return;
        })
      );
      return;
  }

  atualizaValoresMatTable(lista: OrientacaoRitualistica[]) {
    this.listaDocumentos = new MatTableDataSource(lista);
    this.listaDocumentos.sort = this.sort;
    this.listaDocumentos.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
