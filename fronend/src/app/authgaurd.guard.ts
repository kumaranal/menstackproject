import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate {
  flag :any=false ;
  constructor(){
    let authtoken=localStorage.getItem('token')
    console.log(authtoken);
    if(authtoken){
      this.flag=true;
    }
    console.log(this.flag);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.flag;
  }
  
}
