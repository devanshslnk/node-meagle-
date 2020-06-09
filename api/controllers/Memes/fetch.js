const {Meme}=require("../../models");

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
   

}