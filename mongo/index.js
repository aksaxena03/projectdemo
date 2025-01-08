const mongoose = require('mongoose');
main()
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}



const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});
const User = mongoose.model("User", userSchema);

User.findOneAndDelete({name:'akhil'}).then(res=>{console.log(res)})

// User.findByIdAndUpdate("677b8e1b2b059a38a227797a",{name:'nano'} ,{new:true}).then(res=>{
//     console.log(res)
// }).catch(es=>{
//     console.log(es)})

// User.findOneAndUpdate({name:'aman'},{name:'akshit'} ,{new:true}).then(res=>{
//     console.log(res)
// }).catch(es=>{
//     console.log(es)})

// User.updateOne({age:{$gt :50}},{name:'aman'})
// .then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })



// const user2=new User({name:'akash',age:454,email:"a465khil@"});



// User.insertMany([
//     { name: 'amisha', age: 45, email: 'amisha', },
//     { name: 'aman', age: 445, email: 'amsisha', },
//     { name: 'ahi', age: 445, email: 'isha', }
// ]).then(res => {
//     console.log(res)
// })

// user2.save()
//             .then((res)=>{
//                 console.log(res)
//             })
//             .catch((err)=>{
//                 console.log(err)
//             })
