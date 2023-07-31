import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FotosService } from 'src/app/api/fotos/fotos.model';
import { Foto } from 'src/app/core/interface/fotos/foto.mode';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-fotos-read',
  templateUrl: './fotos-read.component.html',
  styleUrls: ['./fotos-read.component.scss']
})
export class FotosReadComponent implements OnInit, OnDestroy {

  filtroNaoEncontrado = '';
  permissaoCadastro = false;

  pasta = 0;

  sub: Subscription[] = [];

  displayedColumns = [
    'codigo',
    'descricao_foto',
    'acao'
  ];

  todasFotos: Foto[] = [];

  listaFoto: MatTableDataSource<Foto>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fotosService: FotosService,
    private _permissaoService: PermissaoService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const pasta = this.route.snapshot.paramMap.get('pasta');

    if(!pasta){
      this.router.navigate(['/fotos/pasta/lista']);
      return;
    }

    this.pasta = Number(pasta);

    if(this._permissaoService.validaPermissaoRotina([1])){
      this.permissaoCadastro = true;
    }

    this.sub.push(
      this._fotosService.retornaTodasFotos(Number(pasta)).subscribe(fotos => {
        this.atualizaValoresMatTable(fotos);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  selectFoto(id: string) {
    this.router.navigate(['/fotos/edit/' + id]);
    return;
  }

  inativaFoto(id: string){
    this.sub.push(
      this._fotosService.editaFoto({ativo: false},Number(id)).subscribe(foto => {
        this._snackBarService.showMessage('Foto excluida com sucesso!');
        return;
      })
    );

    return;
  }

  atualizaValoresMatTable(fotos: Foto[]) {
    this.listaFoto = new MatTableDataSource(fotos);
    this.listaFoto.sort = this.sort;
    this.listaFoto.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
