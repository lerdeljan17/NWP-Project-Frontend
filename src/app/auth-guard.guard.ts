import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router,private loginService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const role =  route.data.authRole
      const localRole = localStorage.getItem("userType")
      // console.log(role)

      if(this.loginService.userLogged() && role != undefined && role == localRole){
        return true
      }

      if(this.loginService.userLogged() && role == undefined){
        return true
      }else{
        return false;
      }
    
  }
  
}
