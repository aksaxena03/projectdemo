const express= require('express');
const app=express();
const mongoose =require('mongoose');
const path =require('path')
const Chat=require("./models/chat.js")
const methodOverride=require("method-override")
const ExpressError=require('./ExpressError')


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"))

main().then(()=>{console.log('mongo connected')}).catch(err=>{console.log(err)});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// const chat1=new Chat({
//     from:'akhil',to:'ak',msg:'hey whatsup',created:new Date()
// })
// chat1.save().then((res)=>console.log(res).catch(err=>console.log(err)))


//middilware initailized area


//asyncwrap
// function hand(err){
//     console.log(err)
//     //using same name which we use in expresserror to define the msg and status
//     let {status=404,message='error 4o4'}=err;
//     console.log(status,message)
//     res.status(status).send(message)
//     // next(status(status).send(message));
// }
function asyncwrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{next(err)
            // res.send(err.status, err.message)
            // let {status=404,message='error 4o4'}=err;
            // console.log(err) 
            //  res.send(err.message+"  "+err.status)
        });
    }
}
// function asyncwrap(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch((err)=>next(err));
//     }
// }
// function asyncwap(fn){return function(req,res,next){fn(req,res,next).catch((err)=>next(err))}}

const checktoken=(req,res,next)=>{
    const{token}=req.query;
    if (token==="brocode"){
        // next(res.send("login succesfull"));
        next();
    }
    // {res.send("login succesfull")}
    throw new ExpressError(401,"AccesDenied")
}


app.get("/api",checktoken,(req,res)=>{
    res.send("data")
})

app.get("/chat/:id/edit",asyncwrap(async(req,res,next)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id)
    if (!chat){
        next(new ExpressError(452,"chat not found"))
    }
    res.render("update.ejs",{chat})
    
}))


//default
// app.use((req,res)=>{
//     res.status(404).send("page not found");
// })

//middilware


app.get('/chat',asyncwrap(async (req,res)=>{
    let chats=await Chat.find()
    // console.log(chats);
    // res.send('working chat');
    res.render('index.ejs',{chats})
}))


//new route
app.get('/chat/new',(req,res)=>{
    res.render('newChat.ejs')
});
//create route
app.post('/chat',(req,res)=>{
    let {to ,from, msg}=req.body;
    let newchat =new Chat({
        from:from,
        to:to,
        msg:msg,
        created:new Date(),
    });
    newchat.save()
    .then(res=>{
        console.log("chat has been added")
    }).catch(err=>{
        console.log(err)
    });
    res.redirect("/chat");
});
//edit form route
app.get("/chat/:id/edit",asyncwrap(async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id)
    res.render("update.ejs",{chat})
}))
//updated route
app.post("/chat/:id",asyncwrap(async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    // console.log(id, newmsg)
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{ runValidators: true,new: true})
    console.log(updatedchat)
    res.redirect("/chat")
}))
//delete form route
app.post("/chat/:id/delete",asyncwrap(async(req,res)=>{
    let {id}=req.params;
    let deletechat=await Chat.findByIdAndDelete(id)
    console.log(deletechat)
    res.redirect("/chat")
}))

const handler=(err)=>{
    console.log("please enter valid values(ValidationError ouccurd)")
    console.log(dir.message)
}

app.use((err,req,res,next)=>{
console.log(err.name)
    if (err.name==="ValidationError"){
    console.log(err.name)
    let err=handler(err)
    }
    next(err);

})
app.use((err,req,res,next)=>{
    let {status=400,message="someting went wrong"}=err;
    res.status(status).send(message)
})

app.get("/",(req,res)=>{
    res.send("working");
})
app.listen(8080,()=>{console.log('server started')})