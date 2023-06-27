import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { OrientacaoRitualistica, OrientacaoRitualisticaEdit } from 'src/app/core/interface/orientacao-ritualistica/orientacao-ritualistica.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrientacaoRitualisticaService {
  baseUrl = `${environment.api}/orientacao-ritualistica/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaListaDeDocumentos(): Observable<OrientacaoRitualistica[]> {
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
  retornaDocumentoPorId(id: number): Observable<OrientacaoRitualistica> {
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

  cadastraDocumento(documento: OrientacaoRitualistica): Observable<OrientacaoRitualistica> {
    return this.http.post<OrientacaoRitualistica>(`${this.baseUrl}`,documento).pipe(
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

  editaDocumento(documento: OrientacaoRitualisticaEdit, id: number): Observable<OrientacaoRitualisticaEdit> {
    return this.http.patch<OrientacaoRitualisticaEdit>(`${this.baseUrl}${id}`,documento).pipe(
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
