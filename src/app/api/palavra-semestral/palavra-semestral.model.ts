import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalavraSemestralService {
  baseUrl = `${environment.api}/palavra-semestral/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  retornaPalavraSemestral(): Observable<{palavra: string}> {
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
  editaPalavraSemestral(palavra: string,id: number): Observable<{palavra: string}> {
    return this.http.patch<{palavra: string}>(`${this.baseUrl}${id}`,{palavra}).pipe(
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
