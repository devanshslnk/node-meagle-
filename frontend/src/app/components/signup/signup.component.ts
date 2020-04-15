import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService) { }

  ngOnInit(): void {
  }

  userSignup(event){
    event.preventDefault();
    const target=event.target;
    const email=target.getElementById("username");
    console.log(email);
  }
}
