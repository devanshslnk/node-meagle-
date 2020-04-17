const express=require("express");
const bcrypt=require("bcryptjs");
const {User}=require("../../models");


module.exports=(app)=>{
   app.post("/signup", async (req,res)=>{
      const body=req.body;
      console.log(req.body);
      const user=new User(body);
      const checkUser= await User.findOne({"email":body.email});
      if(!checkUser){
         try{


            const savedUser=await user.save();
            const refreshToken=await savedUser.createSession();
            
            const authToken=await savedUser.generateAuthToken();            
         
            res.header("x-access-token",authToken).header("x-refresh-token",refreshToken).json({"_id":savedUser._id,"name":user.name,"email":user.email,"username":user.username});
         }catch(e){
            console.log(e);
            res.status(401).json({"message":"email taken"});
         }
      }
   })
   app.post("/login",async (req,res)=>{
      const user=req.body;
      try{
         const queryUser=await User.findOne({"email":user.email});
         if(queryUser){
            bcrypt.compare(user.password,queryUser.password,async (err,result)=>{
               if(result){
                  const refreshToken=await queryUser.createSession();
            
                  const authToken=await queryUser.generateAuthToken();            
                  
                  res.header("x-access-token",authToken).header("x-refresh-token",refreshToken).json({"_id":queryUser._id,"name":queryUser.name,"email":queryUser.email,"username":queryUser.username});
               }else{
                  res.status(401).json({"message":"wrong password"});
               }

            });
         }
      }catch(e){
         console.log("error in login",e);
         res.json({"message":"error"});

      }
   })
}




