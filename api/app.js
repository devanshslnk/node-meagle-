const express=require("express");
const bparser=require("body-parser");
const mongoose=require("./config/database");

const { User }=require("./models");
const { Login ,Access}  =require("./controllers/User")
const {Upload}=require("./controllers/Memes");

const app=express()

app.use(bparser.json())
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); 
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token,x-refresh-token");
   res.header("Access-Control-Expose-Headers","x-access-token,x-refresh-token");
   next();
});

app.use("/uploaded_memes",express.static('uploaded_memes'));



app.get("/testing", async (req,res)=>{

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
   res.json({status:"working"});
})
app.get("/",(req,res)=>{
   console.log("working");
})



Login(app);
Access(app);
Upload(app);

app.listen(3000,()=>{
   console.log("server starting")
})