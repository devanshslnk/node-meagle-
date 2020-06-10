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
  liked=[];


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

  onLikeClick(id:string,likedElement:HTMLElement){
    console.log("clicked");
    if(this.liked.includes(id)){
      likedElement.classList.remove("blue");
      likedElement.classList.add("green");
      this.liked=this.liked.filter((value)=>{return value!=id});
    }else{
      console.log("asddsd");
      likedElement.classList.remove("green");
      likedElement.classList.add("blue");
      this.liked.push(id);

    }
  }

  onComment(comment:string,id:string){
    console.log(comment,id);

  }
}
