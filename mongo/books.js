const mongoose=require("mongoose");
main().then(res=>{
    console.log("mongo connected");
}).catch(err=>{
    console.log("err found " +err)})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema= new mongoose.Schema({
    name:{type:String,required:true},
    code:Number,
    publisher:String,
    cost:Number,
})

const Book=mongoose.model("Book",bookSchema)
// const book1=new Book({name:'Subhas chandra bose',code:1245,publisher:'nehru',cost:452});
// book1.save().then(res=>{
//     console.log(res)
// })


Book.insertMany([
    {name:"rahul gandhi the ",code:1452,publisher:"amarujala",cost:451},
    {name:"gandhi the ",code:14452,publisher:"amarujala",cost:454},
    {name:"rahul the ",code:14512,publisher:"amarujala",cost:451},
    {name:"nitish kumar ",code:1452,publisher:"amarujala",cost:4515},
    {name:"lalu yadav ",code:14522,publisher:"amarujala",cost:45132},
]).then(res=>{
    console.log(res)
})