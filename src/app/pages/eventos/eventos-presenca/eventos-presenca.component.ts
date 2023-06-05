import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PresencaEventoService } from 'src/app/api/presenca-evento/presenca-eventos.model';
import { UsuarioService } from 'src/app/api/usuario/usuario.model';
import { DadosUsuario } from 'src/app/core/interface/usuario/dadosUsuario.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-eventos-presenca',
  templateUrl: './eventos-presenca.component.html',
  styleUrls: ['./eventos-presenca.component.scss']
})
export class EventosPresencaComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  todosUsuarios: DadosUsuario[] = [];
  listaPresenca: number[] = [];

  titulo = 'Lista de Presença';

  constructor(
    private _usuariosService: UsuarioService,
    private router: Router,
    private _presencaEventoService: PresencaEventoService,
    private route: ActivatedRoute,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id_reuniao = this.route.snapshot.paramMap.get('id');
    this.sub.push(
      this._usuariosService.retornaListaUsuarios().subscribe(usuarios => {
        this.todosUsuarios = usuarios;
        this.sub.push(
          this._presencaEventoService.retornaListaPresencaPorIdReuniao(Number(id_reuniao)).subscribe(listaPresenca => {
            this.listaPresenca = listaPresenca.usuarios_presentes;
          })
        );
      })
    );
  }

  alteraListaPresenca(event: Event, id: number | undefined){
    event.preventDefault();
    if(this.verificaPresenca(id)){
      this.listaPresenca = this.listaPresenca.filter(number => number !== Number(id));
      return;
    }

    this.listaPresenca.push(Number(id));
    return;
  }

  verificaPresenca(id: number | undefined): boolean{
    if(this.listaPresenca.includes(Number(id))){
      return true;
    }
    return false;
  }

  envia(){
    const id_reuniao = this.route.snapshot.paramMap.get('id');
    this.sub.push(
      this._presencaEventoService.editaListaPresenca(this.listaPresenca,Number(id_reuniao)).subscribe(presenca => {
        this._snackBarService.showMessage('Lista de presença alterada com sucesso!');
        this.router.navigate(['eventos']);
        return;
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
