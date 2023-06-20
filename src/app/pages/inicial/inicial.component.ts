import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/api/auth/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];

  formLogin: FormGroup = this.fb.group({
    cim: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    senha: ['', Validators.required],
    palavraSemestral: ['', Validators.required]
  });

  esconderSenha = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  salvar(){
    if(!this.formLogin.valid){
      return;
    }

    this._authService.login({
      cim: this.formLogin.controls['cim'].value,
      senha: `${this.formLogin.controls['senha'].value}|palavra_chave|${this.formLogin.controls['palavraSemestral'].value}`
    }).subscribe((tokenLogin) => {
      localStorage.setItem('token-user-hiram1414',String(tokenLogin.token));
      this._snackBarService.showMessage('Logado com sucesso!');
      this.router.navigate(['']);
    });
  }

  somenteNumeros(event: any) {
    const input = event.target;
    const regex = /[^0-9]/g;
    const valor = input.value;
    input.value = valor.replace(regex, '');
  }

  

  toggleVisibilidadeSenha() {
    this.esconderSenha = !this.esconderSenha;
  }

  alertaManutencao(){
    alert('Em manutenção..');
    return;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

}
