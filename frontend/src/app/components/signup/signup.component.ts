import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoggedIn=false;
  constructor(private signupService:SignupService,private router:Router) { }

  
  ngOnInit(): void {
  }
  
  userSignup(userData){
    const username=userData.username;
    const email=userData.email;
    const password=userData.password;
    const name=userData.name;
    this.signupService.authentcation(username,email,password,name).subscribe((response:HttpResponse<any>)=>{
      if(response.status==200){
        this.signupService.setSession(response.body._id,response.headers.get("x-access-token"),response.headers.get("x-refresh-token"));
        this.isLoggedIn=true;
        this.router.navigate(["/home"]);

      }
    });
    
  }

}
