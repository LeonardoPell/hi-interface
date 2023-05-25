import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    cpf: ['', Validators.required,Validators.pattern('^[0-9]*$')],
    senha: ['', Validators.required],
  });

  esconderSenha = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salvar(){
    localStorage.setItem('token-user-hiram1414','teste');
    this.router.navigate(['']);
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

}
