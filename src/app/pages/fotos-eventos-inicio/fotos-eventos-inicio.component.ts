import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FotosService } from 'src/app/api/fotos/fotos.model';
import { Foto } from 'src/app/core/interface/fotos/foto.mode';

@Component({
  selector: 'app-fotos-eventos-inicio',
  templateUrl: './fotos-eventos-inicio.component.html',
  styleUrls: ['./fotos-eventos-inicio.component.scss']
})
export class FotosEventosInicioComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  todasFotos: Foto[] = [];

  constructor(
    private _fotosService: FotosService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const pasta = this.route.snapshot.paramMap.get('pasta');

    if(!pasta){
      this.router.navigate(['fotos-eventos']);
      return;
    }

    this.sub.push(
      this._fotosService.retornaTodasFotos(Number(pasta)).subscribe(fotos => {
        fotos.map(foto => {
          foto.url_arquivo = new URL(foto.url_arquivo).pathname.split('/')[3];
        });
        this.todasFotos = fotos;
        console.log(this.todasFotos);
      })
    );
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
