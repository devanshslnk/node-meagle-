const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {User}=require("../../models");



let authenticate=async (req,res,next)=>{
   let token=req.header("x-access-token");
   let secret=User.getJWTSecret();
   
   jwt.verify(token,secret,(err,decoded)=>{
      if(err){
          res.status(401).send(err);
      }else{
         req.user_id=decoded._id;
         next();
      }
   });
}

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
         
         res.header("x-access-token",accessToken).header("x-refresh-token",req.refreshToken).json({"_id":req.userObject._id,"name":req.userObject.name,"email":req.userObject.email,"username":req.userObject.username});
      }catch(e){
         console.log(e);
         res.send(e);
      } 
   });

   app.get("/testtoken",authenticate,(req,res)=>{
      res.send("success");
   })

}

module.exports.authenticate=authenticate;
