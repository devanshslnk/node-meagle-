const express=require("express");
const bcrypt=require("bcryptjs");
const {User}=require("../../models");
const authenticate=require("./access").authenticate;

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
         }else{
            res.send(404).json({"message":"invalid email"});
            
         }
      }catch(e){
         console.log("error in login",e);
         res.status(500).send(e);

      }
   })


   app.post("/user/edit",authenticate,async (req,res)=>{
      try
      {      
         const queryUser=await User.findOneAndUpdate({_id:req.user_id},req.body);
         res.json({_id:queryUser._id,email:queryUser.email});

      }catch(e){
         console.log(e);

      }
   });

   app.get("/logout/:id",authenticate,async (req,res)=>{
      const refreshToken=req.header("x-refresh-token");
      // console.log(req.params.id);
      // console.log(refreshToken);
      try{
         const removedSession=await User.update({_id:req.params.id},{"$pull":{sessions:{token:refreshToken}}});
         console.log(removedSession);
         res.json({"message":"user logged out "});
      }catch(e){
         // console.log(e);
         // res.send(e);
         res.status(401).send(e);
      } 
   });   
}




