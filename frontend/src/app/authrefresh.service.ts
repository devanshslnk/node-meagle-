import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthrefreshService {

  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL="http://localhost:3000";
   }

  refreshAuthToken(user_id,refreshToken){

    const headers=new HttpHeaders({
      "_id":user_id,
      "x-refresh-token":refreshToken
    });

    return this.http.get(`${this.ROOT_URL}/user/access-token`,{headers:headers,observe:"response"}); 
  }

}
