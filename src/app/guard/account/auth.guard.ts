import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token-user-caq');

    if(token){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    
  }
  
}
