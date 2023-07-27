import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EntradaServiceCreate, EntradaServiceEdit, FinanceiroEntrada } from 'src/app/core/interface/financeiro/financeiro-entrada.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroEntradaService {
  baseUrl = `${environment.api}/financeiro/entrada/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  criaEntrada(entrada: EntradaServiceCreate): Observable<EntradaServiceCreate[]> {
    return this.http.post(`${this.baseUrl}`,entrada).pipe(
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

  editaEntrada(entrada: EntradaServiceEdit, id: number): Observable<EntradaServiceEdit[]> {
    return this.http.patch(`${this.baseUrl}${id}`,entrada).pipe(
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

  retonaEntradaPorId(id: number): Observable<FinanceiroEntrada[]> {
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

  retornaEntradaPorMes(mes: string, ano: string){
    return this.http.get(`${this.baseUrl}mes/${mes}/ano/${ano}`).pipe(
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
