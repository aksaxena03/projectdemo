const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => console.log('connected')).catch((e) => { console.log(e) })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/demotest")
}

//schema
const userSchema = new Schema(
        {
            username: String,
            email: String,
        }
    
)
const postSchema=new Schema({
    post:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const Post = mongoose.model("Post",postSchema)
const User=mongoose.model("User",userSchema)

// const addData=async()=>{
//     // let user1=new User({
//     //     username:'abhi',
//     //     email:'abhi@gmail.com',
//     // })
//     // let posts =new Post({
//     //     post:'hey bro',
//     //     likes:596,
//     // })
//     // posts.user=user1
//     // await user1.save()
//     // await posts.save()
//     let user1=await User.findOne({username:'abhi'})
//     let post2=new Post({
//         post:'by!',
//         likes:'4521'
//     })
//     post2.user=user1;
//     await post2.save()
// }
// addData();
const dataFetch=async()=>{
    const dta=await Post.find().populate('user')
    console.log(dta)
}
dataFetch();