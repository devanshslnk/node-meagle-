import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL="http://localhost:3000"; 
  }

  authentcation(username:string,password:string,email:string,name:string){
    return this.http.post("http://localhost:3000/signup",{username,password,email,name});
  }
  


}
