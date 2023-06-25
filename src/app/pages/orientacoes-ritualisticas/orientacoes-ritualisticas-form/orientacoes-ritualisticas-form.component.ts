import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrientacaoRitualisticaService } from 'src/app/api/orientacao-ritualistica/orientacao-ritualistica.model';
import { OrientacaoRitualisticaEdit } from 'src/app/core/interface/orientacao-ritualistica/orientacao-ritualistica.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-orientacoes-ritualisticas-form',
  templateUrl: './orientacoes-ritualisticas-form.component.html',
  styleUrls: ['./orientacoes-ritualisticas-form.component.scss']
})
export class OrientacoesRitualisticasFormComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  titulo = '';
  descricaoBotao = '';

  documento: OrientacaoRitualisticaEdit = {
    descricao_arquivo: '',
    url_arquivo: ''
  };

  formBasico: FormGroup = this.fb.group({
    descricao_arquivo: ['', Validators.required],
    url_arquivo: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _orientacaoRitualisticaService: OrientacaoRitualisticaService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.titulo = 'Cadastrar Documento';
      this.descricaoBotao = 'Cadastrar';
    } else {
      this.titulo = 'Editar Documento';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';

      this.sub.push(
        this._orientacaoRitualisticaService.retornaDocumentoPorId(Number(id)).subscribe(documento => {
          Object.assign(this.documento,documento);
        })
      );
    }
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvio = {
      descricao_arquivo: this.formBasico.value.descricao_arquivo,
      url_arquivo: this.formBasico.value.url_arquivo,
    };

    if(this.tipoFormulario === 'edita'){
      const id = this.route.snapshot.paramMap.get('id');
      this.sub.push(
        this._orientacaoRitualisticaService.editaDocumento(dadosEnvio,Number(id)).subscribe(documento => {
          this._snackBarService.showMessage('Documento editado com sucesso!');
          this.router.navigate(['orientacoes-ritualisticas']);
          return;
        })
      );
      return;
    }

    this.sub.push(
      this._orientacaoRitualisticaService.cadastraDocumento(dadosEnvio).subscribe(documento => {
        this._snackBarService.showMessage('Documento cadastrado com sucesso!');
        this.router.navigate(['orientacoes-ritualisticas']);
        return;
      })
    );

    return;
  }

  videoCadastraDocumento(){
    window.open('https://drive.google.com/file/d/1JeEqu-M9zyEJU1ziLIpB1D1NTrnxHugB/view?usp=drive_link', '_blank');
    return;
  }

  cancela() {
    this.router.navigate(['orientacoes-ritualisticas']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
