import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

    constructor() {}

    validaPermissaoRotina(permissaoNecessaria: number[],permissaoAtual: number){
        if(permissaoAtual === 1){
            return true;
        }

        if(permissaoNecessaria.includes(permissaoAtual)){
            return true;
        }

        return false;
    }
}