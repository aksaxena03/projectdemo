const express= require('express');
const app=express();
const mongoose =require('mongoose');
const path =require('path')
const Chat=require("./models/chat.js")
const methodOverride=require("method-override")



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
app.get('/chat',async (req,res)=>{
    let chats=await Chat.find()
    // console.log(chats);
    // res.send('working chat');
    res.render('index.ejs',{chats})
})
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
app.get("/chat/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id)
    res.render("update.ejs",{chat})
})
//updated route
app.post("/chat/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    // console.log(id, newmsg)
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{ runValidators: true,new: true})
    console.log(updatedchat)
    res.redirect("/chat")
})
//delete form route
app.post("/chat/:id/delete",async(req,res)=>{
    let {id}=req.params;
    let deletechat=await Chat.findByIdAndDelete(id)
    console.log(deletechat)
    res.redirect("/chat")
})

app.get("/",(req,res)=>{
    res.send("working");
})
app.listen(8080,()=>{console.log('server started')})