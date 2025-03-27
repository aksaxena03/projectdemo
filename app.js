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
    const insta =require("./data.json")//using database to use and manuplate
    const data =insta[username]
    console.log(data);
    res.render("home.ejs",{data});//used to send data from database
})

app.listen(3000);
