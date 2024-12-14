const express =require("express");
const app=express();
const port =8080;
const path =require("path");
const methodOverride=require("method-override")
const { v4: uuidv4 } = require('uuid');
uuidv4();


// app.use(express.json)
app.set("view engine","ejs");
app.set ("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

let posts=[{
    id:uuidv4(),
    name:"akhil saxena",
    content:"hey bro",
},{ id:uuidv4(),
    name:"saxenaji",
    content:"hey bro yo",
},{ id:uuidv4(),
    name:"yo hey",
    content:"hi",
}];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{})
});
app.post("/post",(req, res)=>{
    let {name, content}=req.body;
    let id =uuidv4();
    console.log({name,content})
    posts.push({id ,name , content})
    // res.send("done")
    res.redirect("/posts")
});
app.get("/posts/:id/",(req, res)=>{
    let {id}=req.params;
    let post =posts.find((p)=> id===p.id);
    console.log(id,post)
    res.render("id.ejs",{post})  
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post =posts.find((p)=> id===p.id);
    console.log(id)
    console.log(newContent)
    post.content=newContent;
    res.redirect("/posts")
});
app.get("/posts/:id/edit",(req, res)=>{
    let {id}=req.params;
    let post =posts.find((p)=> id===p.id);
    console.log(id,post)
    res.render("edit.ejs",{post})  
});

app.delete("/posts/:id/",(req, res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=> id!==p.id);
    res.redirect("/posts") 
});
app.listen(port,()=>{
    console.log("server is working")
});