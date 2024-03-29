import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { DadosRelatorioEvento, Evento } from 'src/app/core/interface/evento/evento.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseUrl = `${environment.api}/reunioes/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaListaEventos(): Observable<Evento[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
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

  retornaDadosRelatorioPresenca(): Observable<DadosRelatorioEvento> {
    return this.http.get(`${this.baseUrl}relatorio/dados/2023-01-01`).pipe(
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

  retornaEventoPorId(id: number): Observable<Evento> {
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

  cadastraEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseUrl}`,evento).pipe(
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

  editaEvento(evento: Evento, id: number): Observable<Evento> {
    return this.http.patch<Evento>(`${this.baseUrl}${id}`,evento).pipe(
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
