const express=require("express");
const multer=require("multer");
const authenticate=require("../User/access").authenticate;
const {User,Meme}=require("../../models");


const storage=multer.diskStorage({
   destination:function(req,file,cb){
      // console.log("destination");
      cb(null,"./uploaded_memes/");

   },
   filename:function(req,file,cb){
      let extention=file.mimetype.slice(6);
      cb(null,Date.now().toString()+"."+extention)
   }
});
const fileFilter=(req,file,cb)=>{
   // console.log(file);
   // console.log(req);
   if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"||file.mimetype==="image/jpg"){
      
      cb(null,true);
   }else{
      cb(new Error("wrong  extentions"),false);
   }
}
const upload=multer({
   storage:storage,
   fileFilter:fileFilter
});


module.exports=(app)=>{

   // app.post("/upload",async (req,res)=>{

   // });

   app.post("/uploadmeme",authenticate,upload.single("memeImage"),async (req,res)=>{
      try{
         const meme=new Meme({
            imageId:req.file.filename+"|"+req.user_id,
            path:req.file.path,
            creater:req.user_id

         });
         const savedMeme=await meme.save();
         console.log(savedMeme);
         res.json({path:"http://localhost:3000/uploaded_memes/"+req.file.filename,image_id:savedMeme._id});

      }catch(e){
         res.send(404).send(e);
      }

   });
}