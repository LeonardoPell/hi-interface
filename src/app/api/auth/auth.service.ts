import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Auth } from 'src/app/core/interface/auth/auth.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.api}/auth/`;
  constructor(private http: HttpClient,private _snackBarService: SnackBarService) { }

  login(auth: Auth): Observable<any> {
    return this.http.post<Auth>(`${this.baseUrl}login`, auth).pipe(
      catchError((error) => {
        const message = (error?.error?.message) ? error.error.message : error.message;
        this._snackBarService.showMessage(message,true);
        return of();
      })
    );
  }
  
}
