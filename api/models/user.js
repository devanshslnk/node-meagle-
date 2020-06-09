const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const bcrypt=require("bcryptjs");

const jwtSecret="sbdcdcndkjfvdkdjnfvkndfkjvn";
const userSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   username:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true,
      unique:true
   },
   profileImagePath:{
      type:String
   },
   subscriptions:[this],
   subscribers:[this],
   sessions:[{
      token:{
         type:String,
         required:true
      },
      exprireAt:{
         type:Number,
         required:true
      }
   }]

})



userSchema.methods.generateAuthToken=function(){
   const user=this;
   return new Promise((resolve,reject)=>{
      jwt.sign({_id:user._id.toHexString()},jwtSecret,{expiresIn:"24h"},(err,token)=>{
         if(!err){
            resolve(token);
         }else{
            reject();
         }
      })
   })

}

userSchema.methods.generateRefreshAuthToken=function(){
   return new Promise((resolve,reject)=>{
      crypto.randomBytes(64,(err,buffer)=>{  
         if(!err){
            let token=buffer.toString("hex")
            resolve(token)
         }
      })
   })
}

userSchema.methods.createSession= async function(){
   try
   {
      const user=this
      const refreshToken=await user.generateRefreshAuthToken()
      const saveSession=await saveSessionToDatabase(user,refreshToken)
      return  refreshToken
   }catch(e){
      console.log("Error at create session")
      console.log(e)
      
   }
   
}


userSchema.statics.getJWTSecret=function(){
   return jwtSecret;
}

userSchema.statics.hasRefreshTokenExpired=function(expireAt){
   let currentTime=Date.now()/1000
   if(expireAt<currentTime){
      return true
   }else{
      return false
   }
}

let saveSessionToDatabase=async function(user,refreshToken){

   return new Promise((resolve,reject)=>{
      let expiryTime=generateExpirytime()
      user.sessions.push({
         token:refreshToken,
         exprireAt:expiryTime
      })
      user.save().then((user)=>{
         resolve(user)
         console.log("sessaion added");
      })
      
   })
}

userSchema.pre("save",function(next){
   let user=this;
   let costFactor=10;

   if(user.isModified("password")){
            
      bcrypt.genSalt(costFactor,(err,salt)=>{
         
         if(!err){
            
         bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            next();

         });

         }else{
            console.log(err)
         }
      })
   }else{
      next();
   }
})
let generateExpirytime=function(){
   let valid="10";

   let seconds=valid*24*60*60;
   return (Date.now()/1000+seconds);
}
const User=mongoose.model("User",userSchema)
module.exports=User;