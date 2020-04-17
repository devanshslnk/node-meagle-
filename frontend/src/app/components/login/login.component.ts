import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }


  ngOnInit(): void {
  }

  userLogin(data){
    const email=data.email;
    const password=data.password;
    this.loginService.login(email,password).subscribe((response:HttpResponse<any>)=>{
      
      if(response.status==200){
        this.loginService.setSession(response.body._id,response.headers.get("x-access-token"),response.headers.get("x-refresh-token"));
        this.router.navigate(["/home"]);

      }
    });
  }
}
