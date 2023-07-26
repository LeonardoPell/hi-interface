import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { FinanceiroSaida, SaidaServiceCreate, SaidaServiceEdit } from 'src/app/core/interface/financeiro/financeiro-saida.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroSaidaService {
  baseUrl = `${environment.api}/financeiro/saida/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  criaSaida(saida: SaidaServiceCreate): Observable<SaidaServiceCreate[]> {
    return this.http.post(`${this.baseUrl}`,saida).pipe(
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

  editaSaida(saida: SaidaServiceEdit, id: number): Observable<SaidaServiceEdit[]> {
    return this.http.patch(`${this.baseUrl}${id}`,saida).pipe(
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

  retornaSaidaPorId(id: number): Observable<FinanceiroSaida[]> {
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
  
}
