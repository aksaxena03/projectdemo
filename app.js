const express = require('express');
const app =express();
const path =require("path");  //for path's views folder




app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))  ///for path 
app.get("/",(req, res)=>{
    console.log("hey it is here.")
    res.render("home.ejs");
})
app.get("/diec", (req,res)=>{
    let players=["aman","akhil","suresh","muskesh"];
    let noVal=(Math.floor(Math.random()*6)+1);
    res.render("diece.ejs",{noVal,players}) //{ no : noVal });
    
})
app.get("/ig/:username",(req, res)=>{
    console.log("hey it is here.")
    let {username}=req.params;
    console.log(username);
    res.render("home.ejs",{username});
})

app.listen(3000);
