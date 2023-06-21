import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { DadosUsuarioService } from "./dados-usuario.service";

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

    constructor(private _dadosUsuarioService: DadosUsuarioService) {}

    validaPermissaoRotina(permissaoNecessaria: number[]){
        const permissaoAtual = Number(this._dadosUsuarioService.pegaDadosUsuario().nivel_obreiro);
        if(permissaoAtual === 1){
            return true;
        }

        if(!permissaoNecessaria.length){
            return true;
        }

        if(permissaoNecessaria.includes(permissaoAtual)){
            return true;
        }

        return false;
    }
}