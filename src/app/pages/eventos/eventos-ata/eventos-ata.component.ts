import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AtaReuniaoService } from 'src/app/api/ata-reuniao/ata-reuniao.model';
import { AtaReuniao } from 'src/app/core/interface/ata-reuniao/ata-reuniao.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-eventos-ata',
  templateUrl: './eventos-ata.component.html',
  styleUrls: ['./eventos-ata.component.scss']
})
export class EventosAtaComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  titulo = 'Ata Reuniao';
  descricaoBotao = 'Salvar';

  ataReuniao: AtaReuniao = {
    titulo: '',
    descricao: '',
    reuniao: 0
  }

  formBasico: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
  });

  constructor(
    private readonly _ataReuniaoService: AtaReuniaoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id_reuniao = this.route.snapshot.paramMap.get('reuniao');
    this.sub.push(
      this._ataReuniaoService.retornaAtaPorIdReuniao(Number(id_reuniao)).subscribe(ataReuniao => {
        this.ataReuniao = ataReuniao;
      })
    );
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvio: AtaReuniao = {
      titulo: this.formBasico.value.titulo,
      descricao: this.formBasico.value.descricao,
      reuniao: Number(this.route.snapshot.paramMap.get('reuniao'))
    }

    if(this.ataReuniao.reuniao === 0){
      this._ataReuniaoService.criaAtaReuniao(dadosEnvio).subscribe(ataReuniao => {
        this._snackBarService.showMessage('Ata cadastrada com sucesso!');
        this.router.navigate(['eventos']);
        return;
      })
      return;
    }

    this._ataReuniaoService.editaAtaReuniao(dadosEnvio,Number(this.route.snapshot.paramMap.get('reuniao'))).subscribe(ataReuniao => {
      this._snackBarService.showMessage('Ata editada com sucesso!');
      this.router.navigate(['eventos']);
      return;
    })
    return;
  }

  gerarPdf(){
    this.router.navigate(['eventos/ata/pdf/'+Number(this.route.snapshot.paramMap.get('reuniao'))]);
    return
  }

  cancela() {
    this.router.navigate(['eventos']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
