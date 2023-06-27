import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NivelObreiroService } from 'src/app/api/nivel-obreiro/nivel-obreiro.model';
import { UsuarioService } from 'src/app/api/usuario/usuario.model';
import { DadosUsuario, UsuarioCadastro, UsuarioEditado } from 'src/app/core/interface/usuario/dadosUsuario.model';
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
    elevacao: '',
    exaltacao: '',
    ime: '',
    grau: '',
    endereco_comercial: '',
    telefone_comercial: '',
    endereco_residencial: '',
    telefone_residencial: '',
    nome_pai: '',
    nome_mae: '',
    nome_esposa: '',
    filhos: []
  };
  titulo = '';
  descricaoBotao = '';
  nivelObreiroLista: any[] = [];
  usuarioAtivo: boolean = true;
  minhaConta = false;

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
    nivel_obreiro: ['', Validators.required],
    elevacao: ['', Validators.required],
    exaltacao: ['', Validators.required],
    ime: ['', Validators.required],
    grau: ['', Validators.required],
    endereco_comercial: [''],
    telefone_comercial: [''],
    endereco_residencial: ['', Validators.required],
    telefone_residencial: ['', Validators.required],
    nome_pai: ['', Validators.required],
    nome_mae: ['', Validators.required],
    nome_esposa: [''],
    filhos: this.fb.array([])
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
      this.route.queryParams.subscribe(params => {
        this.minhaConta = params['minhaConta'] === 'true';
      })
    );

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
          this.formBasico.controls['elevacao'].setValue(usuario?.elevacao);
          this.formBasico.controls['exaltacao'].setValue(usuario?.exaltacao);

          this.filhos.clear();

          if(usuario.filhos){
            usuario.filhos.forEach((nomeFilho) => {
              this.filhos.push(this.fb.control(nomeFilho, Validators.required));
            });
          }
        })
      );
    }
  }

  envia(){
    if(!this.formBasico.valid){
      return;
    }

    const dadosEnvioUsuario = {
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
      ativo: true,
      elevacao: this.formBasico.value.elevacao,
      exaltacao: this.formBasico.value.exaltacao,
      ime: this.formBasico.value.ime,
      grau: this.formBasico.value.grau,
      endereco_comercial: this.formBasico.value.endereco_comercial,
      telefone_comercial: this.formBasico.value.telefone_comercial.replace(/[^0-9]/g, ''),
      endereco_residencial: this.formBasico.value.endereco_residencial,
      telefone_residencial: this.formBasico.value.telefone_residencial.replace(/[^0-9]/g, ''),
      nome_pai: this.formBasico.value.nome_pai,
      nome_mae: this.formBasico.value.nome_mae,
      nome_esposa: this.formBasico.value.nome_esposa,
      filhos: this.formBasico.value.filhos
    }

    if(this.tipoFormulario == 'edita'){

      if(!this.formBasico.value.senha || this.formBasico.value.senha === ''){
        delete dadosEnvioUsuario.senha;
      }
      
      this.sub.push(
        this._usuarioService.editaUsuario(dadosEnvioUsuario,Number(this.route.snapshot.paramMap.get('id'))).subscribe(() => {
          this._snackBarService.showMessage('Usuario editado com sucesso!');
          this.router.navigate(['usuarios']);
          return;
        })
      )
      return;
    }

    this.sub.push(
      this._usuarioService.cadastraUsuario(dadosEnvioUsuario).subscribe(() => {
        this._snackBarService.showMessage('Usuario cadastrado com sucesso!');
        this.router.navigate(['usuarios']);
      })
    )
  }

  cancela() {
    this.router.navigate(['usuarios']);
  }

  get filhos() {
    return this.formBasico.get('filhos') as any;
  }

  adicionarFilho(): void {
    this.filhos.push(this.fb.control('', Validators.required));
  }

  removerFilho(index: number): void {
    this.filhos.removeAt(index);
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
