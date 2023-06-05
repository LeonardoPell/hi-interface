import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NivelObreiroService } from 'src/app/api/nivel-obreiro/nivel-obreiro.model';
import { UsuarioService } from 'src/app/api/usuario/usuario.model';
import { UsuarioCadastro, UsuarioEditado } from 'src/app/core/interface/usuario/dadosUsuario.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  tipoFormulario = 'cria';
  usuario: UsuarioCadastro = {
    nome: '',
    email: '',
    cim: '',
    senha: '',
    telefone: '',
    cpf: '',
    rg: '',
    nascimento: '',
    iniciacao: '',
    ativo: true,
    nivel_obreiro: 0,
  };
  titulo = '';
  descricaoBotao = '';
  nivelObreiroLista: any[] = [];
  usuarioAtivo: boolean = true;

  mask = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  formBasico: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    senha: ['', [Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    iniciacao: ['', Validators.required],
    cim: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', Validators.required],
    nascimento: ['', Validators.required],
    nivel_obreiro: ['', Validators.required]
  });
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBarService: SnackBarService,
    private _nivelObreiroService: NivelObreiroService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.sub.push(
      this._nivelObreiroService.retornaListaNiveisObreiros().subscribe(niveisObreiros => {
        this.nivelObreiroLista = niveisObreiros;
      })
    );

    if (!id) {
      this.titulo = 'Cadastrar Usuario';
      this.descricaoBotao = 'Cadastrar';
    } else {
      this.titulo = 'Editar Usuario';
      this.descricaoBotao = 'Salvar';
      this.tipoFormulario = 'edita';

      this.sub.push(
        this._usuarioService.retornaUsuarioPorId(Number(id)).subscribe(usuario => {
          Object.assign(this.usuario,usuario);
          this.usuarioAtivo = Boolean(usuario.ativo);
          this.formBasico.controls['iniciacao'].setValue(usuario.iniciacao);
          this.formBasico.controls['nascimento'].setValue(usuario.nascimento);
        })
      );
    }
  }

  ativo(ativo: boolean): void {
    this.usuarioAtivo = ativo;
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    if(this.tipoFormulario == 'edita'){

      const usuarioEditado: UsuarioEditado = {
        nome: this.formBasico.value.nome,
        telefone: this.formBasico.value.telefone.replace(/[^0-9]/g, ''),
        senha: this.formBasico.value.senha,
        email: this.formBasico.value.email,
        iniciacao: this.formBasico.value.iniciacao,
        cim: this.formBasico.value.cim,
        cpf: this.formBasico.value.cpf.replace(/[^0-9]/g, ''),
        rg: this.formBasico.value.rg,
        nascimento: this.formBasico.value.nascimento,
        nivel_obreiro: this.formBasico.value.nivel_obreiro,
        ativo: this.usuarioAtivo,
      }

      if(!this.formBasico.value.senha || this.formBasico.value.senha === ''){
        delete usuarioEditado.senha;
      }
      
      this.sub.push(
        this._usuarioService.editaUsuario(usuarioEditado,Number(this.route.snapshot.paramMap.get('id'))).subscribe(() => {
          this._snackBarService.showMessage('Usuario editado com sucesso!');
          this.router.navigate(['usuarios']);
          return;
        })
      )
      return;
    }

    this.sub.push(
      this._usuarioService.cadastraUsuario({
        nome: this.formBasico.value.nome,
        telefone: this.formBasico.value.telefone.replace(/[^0-9]/g, ''),
        senha: this.formBasico.value.senha,
        email: this.formBasico.value.email,
        iniciacao: this.formBasico.value.iniciacao,
        cim: this.formBasico.value.cim,
        cpf: this.formBasico.value.cpf.replace(/[^0-9]/g, ''),
        rg: this.formBasico.value.rg,
        nivel_obreiro: this.formBasico.value.nivel_obreiro,
        nascimento: this.formBasico.value.nascimento,
        ativo: true,
      }).subscribe(() => {
        this._snackBarService.showMessage('Usuario cadastrado com sucesso!');
        this.router.navigate(['usuarios']);
      })
    )
  }

  cancela() {
    this.router.navigate(['usuarios']);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
