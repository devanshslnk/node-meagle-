import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from "@angular/common/http";

import {AuthrefreshService} from "../../authrefresh.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  image;
  message:string;

  constructor(private http:HttpClient,private authRefershService:AuthrefreshService) { }

  ngOnInit(): void {
  }
  selectedImage(event){
    this.image=event.target.files[0];

  }
  uploadMeme(){
    const formData=new FormData();
    const accessToken=localStorage.getItem("accessToken");

    if(this.image!=null && accessToken!=null)
    {
      formData.append('memeImage',this.image);
      const headers=new HttpHeaders({
        "x-access-token":accessToken
      });

      this.http.post("http://localhost:3000/uploadmeme",formData,{headers:headers,observe:'response'}).subscribe((response:HttpResponse<any>)=>{
        
        if(response.status==200){
          this.message="image uploaded";
        }  
      },(err:HttpErrorResponse)=>{

        if(err.error.name=="TokenExpiredError"){
          console.log("Tokenexpired");
          const user_id=localStorage.getItem("_id");
          const refreshToken=localStorage.getItem("refreshToken");
          this.authRefershService.refreshAuthToken(user_id,refreshToken).subscribe((response:HttpResponse<any>)=>{
            
            const accessToken=response.headers.get("x-access-token");
            localStorage.setItem("accessToken",accessToken);
            this.message="please try again your session had exipred";

          },(err)=>{
            console.log(err);
          });
        }else{
          this.message="some error occured"
        }
      });


    }else{
      this.message="please select and image";

    }
  }

}
