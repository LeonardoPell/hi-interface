import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { DadosUsuario, UsuarioCadastro, UsuarioEditado } from 'src/app/core/interface/usuario/dadosUsuario.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = `${environment.api}/usuario/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaListaUsuarios(): Observable<DadosUsuario[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.message) ? error.error.message : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  retornaUsuarioPorId(id: number): Observable<DadosUsuario> {
    return this.http.get(`${this.baseUrl}${id}`).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.message) ? error.error.message : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  cadastraUsuario(usuario: UsuarioCadastro): Observable<UsuarioCadastro> {
    return this.http.post<UsuarioCadastro>(`${this.baseUrl}`,usuario).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.message) ? error.error.message : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  editaUsuario(usuario: UsuarioEditado,id: number): Observable<UsuarioEditado> {
    return this.http.patch<UsuarioEditado>(`${this.baseUrl}${id}`,usuario).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.message) ? error.error.message : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }
  
}
