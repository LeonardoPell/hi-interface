import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EditaFoto, Foto } from 'src/app/core/interface/fotos/foto.mode';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  baseUrl = `${environment.api}/fotos/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaTodasFotos(pasta: number): Observable<Foto[]> {
    return this.http.get(`${this.baseUrl}todas/${pasta}`).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.mensagem) ? error.error.mensagem : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  retornaFotosPorId(id: number): Observable<Foto> {
    return this.http.get(`${this.baseUrl}${id}`).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.mensagem) ? error.error.mensagem : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  cadastraFoto(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(`${this.baseUrl}`,foto).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.mensagem) ? error.error.mensagem : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }

  editaFoto(foto: Foto, id: number): Observable<EditaFoto> {
    return this.http.patch<Foto>(`${this.baseUrl}${id}`,foto).pipe(
        map((response: any) => {
            return response.dados;
        }),
        catchError((error) => {
            const message = (error?.error?.mensagem) ? error.error.mensagem : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }
  
}
