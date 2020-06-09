import { Component, OnInit } from '@angular/core';
import {DisplayService} from "./display.service";
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  readonly ROOT_MEME_URL;
  memeData;

  constructor(private displayService:DisplayService) {
    this.ROOT_MEME_URL="http://localhost:3000"
  }
  
  ngOnInit(): void {

    console.log("works");
    

    // const test=;
    this.displayService.fetchMemes().subscribe((response:HttpResponse<any>)=>{
      // console.log(response.body);
      this.memeData=response.body;
      console.log(this.memeData);


    });  

  }

  onLikeClick(id:string){
    console.log("liked");
  }

}
