import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/api/usuario/usuario.model';
import { DadosUsuario } from 'src/app/core/interface/usuario/dadosUsuario.model';
import * as moment from 'moment';
import { PermissaoService } from 'src/app/core/services/permissao.service';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.scss']
})
export class UsuarioReadComponent implements OnInit {

  filtroNaoEncontrado = '';
  permissaoCadastro = false;
 
  sub: Subscription[] = [];

  displayedColumns = [
    'nome',
    'email',
    'telefone',
    'iniciacao'
  ];

  todosUsuarios: DadosUsuario[] = [];

  listaUsuario: MatTableDataSource<DadosUsuario>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _permissaoService: PermissaoService,
  ) { }

  ngOnInit(): void {

    if(this._permissaoService.validaPermissaoRotina([1])){
      this.permissaoCadastro = true;
    }

    this.sub.push(
      this._usuarioService.retornaListaUsuarios().subscribe(usuarios => {
        this.atualizaValoresMatTable(usuarios);
      })
    );
  }

  recebeValorFiltro(event: string) {
    this.filtroNaoEncontrado = event;
  }

  selectUsuario(id: number) {
    if(this._permissaoService.validaPermissaoRotina([1])){
      this.router.navigate(['/usuarios/edit/' + id]);
      return;
    }
    return;
  }

  inativaUsuario(id: DadosUsuario){
    return;
  }

  atualizaValoresMatTable(lista: DadosUsuario[]) {
    this.listaUsuario = new MatTableDataSource(lista);
    this.listaUsuario.sort = this.sort;
    this.listaUsuario.paginator = this.paginator;
  }

  formataDataHora(data: string){
    moment.locale('pt-br');
    return moment(data).format('DD/MM/YYYY');
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
