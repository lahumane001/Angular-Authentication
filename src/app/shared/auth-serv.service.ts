import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServService {

  refreshTokenSub = new Subject<boolean>
  constructor(private http:HttpClient) { }
  profileUrl = 'https://api.escuelajs.co/api/v1/auth/profile'
  loginUrl = 'https://api.escuelajs.co/api/v1/auth/login'
  refreshUrl = 'https://api.escuelajs.co/api/v1/auth/refresh-token'
  
  login(obj:any): Observable<any>{
    return this.http.post(this.loginUrl,obj)
  }

  getData(){
    return this.http.get(this.profileUrl)
  }

  refreshToken(){
    let loggedUser: any;
    let localToken = localStorage.getItem('token')
    console.log(localToken);

    if (localToken != null) {
      loggedUser = JSON.parse(localToken)
    }
    const obj = {
      "refreshToken":loggedUser.refresh_token
    }
   return this.http.post(this.refreshUrl,obj).subscribe((res:any)=>{
      localStorage.setItem('token',JSON.stringify(res))
    })
  }

}
