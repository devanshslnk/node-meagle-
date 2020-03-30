const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   username:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   profileImagePath:{
      type:String
   },
   subscriptions:[this],
   subscribers:[this]

   

})


const User=mongoose.model("User",userSchema)
module.exports=User;