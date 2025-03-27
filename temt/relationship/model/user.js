const mongoose =require("mongoose");
const {Schema}=mongoose

main().then(()=>console.log("mongo connected")).catch((e)=>console.log(e))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/demotest")
}



//schema building
const userSchema=new Schema({
    username:String,
    addresses:[{
        location:String,
        city:String,
    }]
})

//model building
const User= mongoose.model("User",userSchema)

//function for data insertion
// const addUser=async()=>{
//     const user1=new User({
//         username:"akhil saxena",
//         addresses:[{location:"dalal street bombay",city:'bombay'}]
//     })
//     user1.addresses.push({location:'batish khopdi',city:'uttarakhand'})
//     await user1.save()
// } 

// addUser()