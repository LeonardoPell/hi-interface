import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FotosService } from 'src/app/api/fotos/fotos.model';
import { PastaFotosService } from 'src/app/api/fotos/pasta.model';
import { Foto } from 'src/app/core/interface/fotos/foto.mode';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-fotos-form',
  templateUrl: './fotos-form.component.html',
  styleUrls: ['./fotos-form.component.scss']
})
export class FotosFormComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  titulo = '';
  descricaoBotao = '';
  url_previa = '';
  url_drive = 'https://drive.google.com/uc?export=view&id=';

  foto: Foto = {
    descricao_foto: '',
    url_arquivo: '',
    pasta: 0,
    ativo: true,
  };

  formBasico: FormGroup = this.fb.group({
    descricao_foto: ['', Validators.required],
    url_arquivo: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _fotosService: FotosService,
    private _pastaFotosService: PastaFotosService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const pasta = this.route.snapshot.paramMap.get('pasta');

    if (pasta) {
      this.titulo = 'Enviar Foto';
      this.descricaoBotao = 'Enviar';
    } else if(id) {
      this.titulo = 'Editar Foto';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';
      this.sub.push(
        this._fotosService.retornaFotosPorId(Number(id)).subscribe(foto => {
          Object.assign(this.foto,foto);
          this.mostraPreviaImagem();
        })
      );
    }else{
      this.router.navigate(['fotos/pasta/lista']);
      return;
    }
  }

  envia(){

    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvio: Foto = {
      descricao_foto: this.formBasico.value.descricao_foto,
      url_arquivo: this.formBasico.value.url_arquivo,
      ativo: true,
    }

    if(this.route.snapshot.paramMap.get('pasta')){
      dadosEnvio.pasta = Number(this.route.snapshot.paramMap.get('pasta'))
    }

    if(this.tipoFormulario === 'edita'){
      const id = this.route.snapshot.paramMap.get('id');
      this.sub.push(
        this._fotosService.editaFoto(dadosEnvio,Number(id)).subscribe(foto => {
          this._snackBarService.showMessage('Foto editada com sucesso!');
          this.router.navigate(['fotos/pasta/lista']);
          return;;
        })
      );

      return;
    }

    this.sub.push(
      this._fotosService.cadastraFoto(dadosEnvio).subscribe(foto => {
        this._snackBarService.showMessage('Foto inserida com sucesso!');
        this.router.navigate(['fotos/pasta/lista']);
        return;;
      })
    );

    return;
  }

  mostraPreviaImagem(){

    if(!this.formBasico.value.url_arquivo){
      if(this.foto.url_arquivo){
        const urlString = this.foto.url_arquivo;
        const url = new URL(urlString).pathname.split('/');
        this.url_previa = this.url_drive+url[3];
        return;
      }
    }

    const urlString = this.formBasico.value.url_arquivo;
    const url = new URL(urlString).pathname.split('/');
    this.url_previa = this.url_drive+url[3];
    return;
  }

  videoCadastraFoto(){
    window.open('https://drive.google.com/file/d/1_5hKrwMIAaTxAZVhAI_C38PJOEs5w_AN/view?usp=drive_link', '_blank');
    return;
  }

  cancela() {
    this.router.navigate(['fotos/pasta/lista']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
