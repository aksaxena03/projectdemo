const express =require("express");
const app=express();
const port =3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json); git // it is use only when user's post data in json format

app.get("/register",(req,res)=>{
    console.log("get is listenig")
    let {name, password}=req.query;
    // console.log(name + password)

    res.send(`hey get method ${name}`);
});
app.post("/register",(req,res)=>{
    console.log("post is listenig")
    // console.log(req.body)
    let {name,pass}=req.body;
    res.send(`hey post method ${name} `)
});

app.listen(port)
