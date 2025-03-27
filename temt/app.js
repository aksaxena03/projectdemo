const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const review = require('../mongoProject/models/review');
const flash = require('connect-flash');
const path=require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
                                         //express-session
// let sessionop = { secret: 'pie',
//                 resave: false,
//                 saveUninitialized: true }

// app.use(session(sessionop))


// app.get('/hello',(req,res)=>{
//     let {name="anonymous"}=req.query
//     req.session.name=name;
//     res.send(req.session.name)
// })
// app.get('/hey',(req,res)=>{
//     res.send(  `hey ${req.session.name}`)
// })

                                        //connect-flash
let sessionop = { secret: 'pie',
    resave: false,
    saveUninitialized: true }


app.use(session(sessionop))
app.use(flash())


app.get('/hello',(req,res)=>{
    let {name="anonymous"}=req.query
    req.session.name=name;
    req.flash("pie","hey there");
    res.redirect('/hey')
})

app.use((req,res,next)=>{
    res.locals.messages=req.flash("pie")//we can use it as middilware
    next()
})
app.get('/hey',(req,res)=>{
    // console.log()
    // res.send(  `hey ${req.session.name}`)
    // res.locals.messages=req.flash("pie")//we can use it as middilware

res.render('page.ejs',    
        {name:req.session.name })
})

                                        //cookieParser
// app.use(cookieParser("secret"))

// app.get("/",(req,res)=>{
//     // res.cookie("catch","value",{signed:true});
//     // console.log('woking')
//     // console.log(req.signedCookie)
//     let {name="akhil"}=req.cookies;
//     console.dir(req.cookies)
//     res.send(`hi ,${name}`);

// })

                                         //express-session=>count the session
// app.get('/reqcount',(req,res)=>{
//     if(req.session.count){
//         req.session.count++
//     }
//     else{
//         req.session.count=1

//     }
//     res.send(`you have visited this site ${req.session.count} times`)

// })

// app.get('/',(req,res)=>{
//     res.send('hey b')
// })






app.listen(3000);

// const { string } = require("joi");
// const mongoose =require("mongoose")
// const {Schema}=mongoose;
// main().then(()=>{
//     console.log("connected")
// }).catch((er)=>{
//     console.log(err)
// })
// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/demo");
// }
// const userSchema=new Schema({
//     username:String,
//     addresses:String
// }