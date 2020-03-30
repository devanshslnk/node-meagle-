const mongoose=require("mongoose");
const dotenv=require("dotenv")


dotenv.config()
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const username=process.env.DB_USERNAME
const password=process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-owkpo.mongodb.net/memeshare?retryWrites=true&w=majority`,{useNewUrlParser:true}).then(()=>{
   console.log("db connected");


}).catch((e)=>{
   console.log(e)
})

module.exports=mongoose
