import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './services/login.service';

@Injectable({
    providedIn:'root'
})

export class JWTInterceptor implements HttpInterceptor{

    constructor(public loginService:LoginService,
                private router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.loginService.getJwt();
        
        
        if(req.headers.get("skip")){
            return next.handle(req);
        }
        

        req = req.clone({
            setHeaders:{
                Authorization:'Bearer '+ jwtToken 
            }
        });
        if(!jwtToken){
            return next.handle(req);
        }
        return next.handle(req).pipe(catchError(err=>this.handleError(err)));
       


    }
    private handleError(error:HttpErrorResponse):Observable<any>{

        if(error.status == 401 || error.status == 403){
            this.router.navigateByUrl('/');

            
        }
        return throwError(error);

    }

}