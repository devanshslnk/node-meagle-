const express=require("express");
const bparser=require("body-parser");
const mongoose=require("./config/database")

const app=express()
app.use(bparser.json())



app.listen(3000,()=>{
   console.log("server starting")
})