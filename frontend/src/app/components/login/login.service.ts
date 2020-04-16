import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL="http://localhost:3000";
   }

  login(email:string,password:string){
    
    return this.http.post("http://localhost:3000/login",{email,password},{observe:'response'})
  }

  setSession(user_id,accessToken,refreshToken){
    localStorage.setItem("_id",user_id);
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken",refreshToken);
    
  }

  removeSession(){
    localStorage.removeItem("_id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
  }

  logout(){
    this.removeSession();
  }

}
