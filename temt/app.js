const { string } = require("joi");
const mongoose =require("mongoose")
const {Schema}=mongoose;

main().then(()=>{
    console.log("connected")
}).catch((er)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/demo");
}



const userSchema=new Schema({
    username:String,
    addresses:String
})