import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  readonly ROOT_URL;
  constructor(private http:HttpClient) { 
    this.ROOT_URL="http://localhost:3000";

  }

  fetchMemes(){
    const accessToken=localStorage.getItem("accessToken");
    if(accessToken!==null){
      const headers=new HttpHeaders({
        "x-access-token":accessToken
      });
      return this.http.get(`${this.ROOT_URL}/api/fetchmemes`,{headers:headers,observe:"response"});

    }
  }
}
