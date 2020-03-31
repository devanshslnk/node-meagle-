const express=require("express");
const bcrypt=require("bcryptjs");
const {User}=require("../../models");

let verifyTokenMiddleware=async (req,res,next)=>{
   let req_id=req.header("_id");
   let reqToken=req.header("x-refresh-token");
   try{
      const queryUser=await User.findOne({_id:req_id});
      if(queryUser){
         let sessionIsValid=false;
         req.user_id=queryUser._id;
         req.userObject=queryUser;
         req.refreshToken=reqToken;
         queryUser.sessions.forEach((session)=>{
            if(session.token===reqToken){
               if(!User.hasRefreshTokenExpired(session.exprireAt)){
                  sessionIsValid=true;
               }
            }

         });
         if(sessionIsValid===true){
            next();
         }else{
            res.json({"message":"session-expired"});
         }
      }
   }catch(e){
      console.log(e);
      res.status(404).send(e);
   }
}

module.exports=(app)=>{
   app.get("/user/access-token",verifyTokenMiddleware,async (req,res)=>{
      try{
         const accessToken=await req.userObject.generateAuthToken(req.refreshToken);
         res.header("x-acces-token",accessToken).header("x-refresh-token",req.refreshToken).json({"_id":req.userObject._id,"name":req.userObject.name,"email":req.userObject.email,"username":req.userObject.username});
      }catch(e){
         console.log(e);
         res.send(e);
      } 
   });
}