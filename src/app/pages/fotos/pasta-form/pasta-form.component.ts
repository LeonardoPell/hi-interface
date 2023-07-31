import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PastaFotosService } from 'src/app/api/fotos/pasta.model';
import { PastaFotos } from 'src/app/core/interface/fotos/pasta.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-pasta-form',
  templateUrl: './pasta-form.component.html',
  styleUrls: ['./pasta-form.component.scss']
})
export class PastaFormComponent implements OnInit, OnDestroy {

  pasta: PastaFotos = {
    nome_pasta: '',
    ativo: true
  }

  sub: Subscription[] = [];
  titulo = '';
  descricaoBotao = '';
  tipoFormulario = 'cria'

  formBasico: FormGroup = this.fb.group({
    nome_pasta: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _PastaFotosService: PastaFotosService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.titulo = 'Criar Pasta';
      this.descricaoBotao = 'Cadastrar';
    } else {
      this.titulo = 'Editar Pasta';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';
      this.sub.push(
        this._PastaFotosService.retornaPastaPorId(Number(id)).subscribe(pasta => {
          Object.assign(this.pasta,pasta);
        })
      );
    }
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvio = {
      nome_pasta: this.formBasico.value.nome_pasta,
      ativo: true
    }

    if(this.tipoFormulario === 'edita'){
      const id = this.route.snapshot.paramMap.get('id');
      this.sub.push(
        this._PastaFotosService.editaPasta(dadosEnvio,Number(id)).subscribe(pasta => {
          this._snackBarService.showMessage('Pasta editada com sucesso!');
          this.router.navigate(['fotos/pasta']);
          return;;
        })
      );

      return;
    }

    this.sub.push(
      this._PastaFotosService.cadastraPasta(dadosEnvio).subscribe(pasta => {
        this._snackBarService.showMessage('Pasta criada com sucesso!');
        this.router.navigate(['fotos/pasta']);
        return;;
      })
    );

    return;
  }

  cancela() {
    this.router.navigate(['fotos/pasta']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
