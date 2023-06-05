import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Evento } from 'src/app/core/interface/evento/evento.model';
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
            const message = (error?.error?.message) ? error.error.message : error.message;
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
            const message = (error?.error?.message) ? error.error.message : error.message;
            this._snackBarService.showMessage(message,true);
            return of();
        })
    );
  }  
}
