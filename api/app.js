const express=require("express");
const bparser=require("body-parser");
const mongoose=require("./config/database")
const { User }=require("./models")
const app=express()
app.use(bparser.json())


app.get("/test", async (req,res)=>{

   // const user=new User({
   //    name:"devansh",
   //    email:"dvdfv",
   //    username:"devacsadcanshslnk",
   //    password:"devanshscdc"
   // })
   
   // user.save().then((userresult)=>{
   //    console.log(userresult)
   // })
   // const user1=await User.findOne({"name":"sharvai"})
   // console.log(user1)
   // const user= await User.findOneAndUpdate({"name":"devansh"},{$push:{subscriptions:user1._id}})
   // console.log(user)

   // const user =await User.find({"name":"devansh"}).populate("subscriptions")
   // console.log(user)
   // const subscriptions=user[0].subscriptions
   // subscriptions.forEach((user)=>{
   //    console.log(user.name)
   // })
   
})
app.get("/",(req,res)=>{
   console.log("working");
})
app.listen(3000,()=>{
   console.log("server starting")
})