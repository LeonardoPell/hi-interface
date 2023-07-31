import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EditaPastaFotos, PastaFotos } from 'src/app/core/interface/fotos/pasta.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastaFotosService {
  baseUrl = `${environment.api}/fotos/pasta/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaTodasPastas(): Observable<PastaFotos[]> {
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

  retornaPastaPorId(id: number): Observable<PastaFotos> {
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

  cadastraPasta(pasta: PastaFotos): Observable<PastaFotos> {
    return this.http.post<PastaFotos>(`${this.baseUrl}`,pasta).pipe(
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

  editaPasta(pasta: EditaPastaFotos, id: number): Observable<EditaPastaFotos> {
    return this.http.patch<PastaFotos>(`${this.baseUrl}${id}`,pasta).pipe(
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
