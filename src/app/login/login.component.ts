import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServService } from '../shared/auth-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authUsers: any;

constructor(private httpserv:AuthServService , private router : Router){}
  ngOnInit(): void {
    this.authUsers = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }
  login(){
    console.log(this.authUsers.value);
    this.httpserv.login(this.authUsers.value).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('token', JSON.stringify(res))
      this.router.navigate(['profile'])
    })
  }
}
