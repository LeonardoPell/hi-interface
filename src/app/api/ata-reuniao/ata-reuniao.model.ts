import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AtaReuniao } from 'src/app/core/interface/ata-reuniao/ata-reuniao.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtaReuniaoService {
  baseUrl = `${environment.api}/ata-reuniao/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaAtaPorIdReuniao(id_reuniao: number): Observable<AtaReuniao> {
    return this.http.get(`${this.baseUrl}reuniao/${id_reuniao}`).pipe(
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

  criaAtaReuniao(ataReuniao: AtaReuniao): Observable<AtaReuniao> {
    return this.http.post<AtaReuniao>(`${this.baseUrl}`,ataReuniao).pipe(
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

  editaAtaReuniao(ataReuniao: AtaReuniao, id: number): Observable<AtaReuniao> {
    return this.http.patch<AtaReuniao>(`${this.baseUrl}${id}`,ataReuniao).pipe(
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
