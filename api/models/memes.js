const mongoose=require("mongoose")

const memeSchema=new mongoose.Schema({
   imageId:{
      type:String,
      required:true
   },
   creater:{
      type:mongoose.Schema.Types.ObjectId,ref="User",
      required:true
   },
   path:{type:String},
   comments:[{
      comment:{type:String},
      commenter:{ type:mongoose.Schema.Types.ObjectId,ref="User"}
   }],
   likes:[{
      status:{type:Boolean},
      uid:{ type:mongoose.Schema.Types.ObjectId,ref="User"}
   }]

   
}) 