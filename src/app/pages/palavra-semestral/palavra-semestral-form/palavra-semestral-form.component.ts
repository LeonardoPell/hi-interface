import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PalavraSemestralService } from 'src/app/api/palavra-semestral/palavra-semestral.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-palavra-semestral-form',
  templateUrl: './palavra-semestral-form.component.html',
  styleUrls: ['./palavra-semestral-form.component.scss']
})
export class PalavraSemestralFormComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  titulo = 'Cadastrar Palavra Semestral';
  descricaoBotao = 'Salvar';
  palavraSemestral = '';

  formBasico: FormGroup = this.fb.group({
    palavraSemestral: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _palavraSemestralService: PalavraSemestralService,
    private _snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.sub.push(
      this._palavraSemestralService.retornaPalavraSemestral().subscribe(palavraSemestral => {
        this.palavraSemestral = palavraSemestral.palavra;
      })
    );
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    this.sub.push(
      this._palavraSemestralService.editaPalavraSemestral(this.formBasico.value.palavraSemestral, 1).subscribe(() => {
        this._snackBarService.showMessage('Palavra Semestral alterada com sucesso!');
        this.router.navigate(['palavra-semestral']);
      })
    );
  }

  cancela() {
    this.router.navigate(['noticias']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
