import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginStatus=false;
  constructor(private loginService:LoginService,private router:Router) { 
  }

  ngOnInit(): void {
     const loginCheck=localStorage.getItem("_id");
     
     if(loginCheck===null){
      this.loginStatus=false; 
      this.router.navigate(["/login"]);

     }else{
       this.loginStatus=true;
     }
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"]);    
  }


}

