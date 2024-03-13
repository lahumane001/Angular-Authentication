import { Component, OnInit } from '@angular/core';
import { AuthServService } from '../shared/auth-serv.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userList:any;
  constructor(private httpserv:AuthServService){}

  ngOnInit(): void {
    this.httpserv.getData().subscribe((res:any)=>{
      console.log(res);
      this.userList = res;
      // console.log(this.userList);
      
    })
  }
}
