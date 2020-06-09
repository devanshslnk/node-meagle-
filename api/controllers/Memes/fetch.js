const {User,Meme}=require("../../models");

const authenticate=require("../User/access").authenticate;



module.exports=(app)=>{
   app.get("/api/fetchmemes",authenticate,async (req,res)=>{
      try{
         const memes=await Meme.find({creater:{$ne:req.user_id}});
         console.log(memes);
         
         res.json(memes);         
      }catch(e){
         // console.log(e);
         res.status(500).send(e);

      }

   });

   app.patch("/api/action/like",async (req,res)=>{
      try{
         const imageId=req.body.imageId;
         const userId=req.body._id;

         const likedMeme=await Meme.update({"imageId":imageId},{"$push":{likes:{status:true,uid:userId}}})
         console.lof(likedMeme);
         res.json({"message":"liked"});
         


      }catch(e){

      }
   })
      
   

}