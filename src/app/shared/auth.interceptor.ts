import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServService } from './auth-serv.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userServ:AuthServService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedUser: any;
    let localToken = localStorage.getItem('token')
    console.log(localToken);

    if (localToken != null) {
      loggedUser = JSON.parse(localToken)
    }
    console.log(loggedUser.access_token);

    request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${loggedUser.access_token}`) })
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          const isRefrsh = confirm("your session is expired .Do you want to continue")
          if(isRefrsh){
            this.userServ.refreshTokenSub.next(true)
          }
        }

        return throwError(error)
      })
    )
  }
}
