import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { DadosUsuario } from "../interface/usuario/dadosUsuario.model";

@Injectable({
  providedIn: 'root'
})
export class DadosUsuarioService {

    constructor() {}

    pegaDadosUsuario(): DadosUsuario{
      debugger;
        const usuarioToken: any = localStorage.getItem('token-user-hiram1414');
        return jwt_decode(usuarioToken);
    }
}