import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PastaFotosService } from 'src/app/api/fotos/pasta.model';
import { PastaFotos } from 'src/app/core/interface/fotos/pasta.model';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-pasta-read',
  templateUrl: './pasta-read.component.html',
  styleUrls: ['./pasta-read.component.scss']
})
export class PastaReadComponent implements OnInit, OnDestroy {
  
  filtroNaoEncontrado = '';
  permissaoCadastro = false;

  sub: Subscription[] = [];

  displayedColumns = [
    'codigo',
    'nome_pasta',
    'acao'
  ];

  todasPastas: PastaFotos[] = [];

  listaPasta: MatTableDataSource<PastaFotos>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(
    private router: Router,
    private _pastaFotosService: PastaFotosService,
    private _permissaoService: PermissaoService,
    private _snackBarService: SnackBarService,
  ) { }
  
  ngOnInit(): void {
    if(this._permissaoService.validaPermissaoRotina([1])){
      this.permissaoCadastro = true;
    }

    this.sub.push(
      this._pastaFotosService.retornaTodasPastas().subscribe(pastas => {
        this.atualizaValoresMatTable(pastas);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  visualizarFotos(pasta: string) {
    this.router.navigate(['/fotos/' + pasta]);
    return;
  }

  selectPasta(id: string) {
    this.router.navigate(['/fotos/pasta/edit/' + id]);
    return;
  }

  inativaPasta(id: string){
    this.sub.push(
      this._pastaFotosService.editaPasta({ativo: false},Number(id)).subscribe(pasta => {
        this._snackBarService.showMessage('Pasta excluida com sucesso!');
        return;
      })
    );

    return;
  }

  atualizaValoresMatTable(lista: PastaFotos[]) {
    this.listaPasta = new MatTableDataSource(lista);
    this.listaPasta.sort = this.sort;
    this.listaPasta.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
