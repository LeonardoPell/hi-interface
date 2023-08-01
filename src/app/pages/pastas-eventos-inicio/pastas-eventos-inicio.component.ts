import { PastaFotosService } from 'src/app/api/fotos/pasta.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PastaFotos } from 'src/app/core/interface/fotos/pasta.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pastas-eventos-inicio',
  templateUrl: './pastas-eventos-inicio.component.html',
  styleUrls: ['./pastas-eventos-inicio.component.scss']
})
export class PastasEventosInicioComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  todasPastas: PastaFotos[] = [];

  constructor(
    private _pastaFotosService: PastaFotosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sub.push(
      this._pastaFotosService.retornaTodasPastas().subscribe(pastas => {
        this.todasPastas = pastas;
      })
    );
  }

  selecionaPasta(pasta: number | undefined){
    if(typeof pasta === 'number'){
      this.router.navigate(['fotos-eventos/'+pasta]);
      return;
    }

    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
