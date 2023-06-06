import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { PresencaEvento } from 'src/app/core/interface/presenca-evento/presenca-evento.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresencaEventoService {
  baseUrl = `${environment.api}/presenca-reuniao/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaListaPresencaPorIdReuniao(id_reuniao: number): Observable<PresencaEvento> {
    return this.http.get(`${this.baseUrl}${id_reuniao}`).pipe(
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

  editaListaPresenca(usuarios: number[], id_reuniao: number): Observable<PresencaEvento> {
    return this.http.patch<PresencaEvento>(`${this.baseUrl}${id_reuniao}`,{usuarios_presentes: usuarios}).pipe(
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
