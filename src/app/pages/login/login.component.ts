import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  ) { }

  ngOnInit(): void {
  }

  salvar(){
    alert('Em construção!');
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
