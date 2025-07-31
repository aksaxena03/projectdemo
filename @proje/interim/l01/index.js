const{ faker }=require("@faker-js/faker");
const mysql2=require('mysql2');
const express =require("express")
const app=express();
const path =require("path");
const methodOverride=require("method-override")
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set ("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection=mysql2.createConnection({
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"147852"
});
//home route
app.get ("/",(req,res)=>{
    // res.send("welcome to home");
    let q=`SELECT count(*) FROM user`;
    try{ 
        connection.query(q,(err,results)=>{ 
                if (err) throw err;
                //this.results()
                console.log(results);
                let result=results[0]['count(*)'];
                res.render("home.ejs",{result});
            });
        }
        catch(err){
            console.log(err);
            res.send("some err")
        } 
});
// show route
app.get("/user",(req,res)=>{
    // res.send("success");
    let q =`SELECT * FROM user`;
    try{ 
        connection.query(q,(err,data)=>{ 
                if (err) throw err;
                res.render("showusers.ejs",{data});
            });
        }
        catch(err){console.log(err);
            res.send("some err")
        } 
})
//edit routes
app.get("/user/:id/edit",(req,res)=>{
    const{id}=req.params;
    let q=`SELECT * FROM user WHERE id ="${id}"`;
    console.log(id)
    try{ 
        connection.query(q,(err,results)=>{ 
                if (err) throw err;
                //this.results()
                // console.log(results[0]);
                let user=results[0];
                res.render("edituser.ejs",{user});
            });
        }
        catch(err){
            console.log(err);
            res.send("some err")
        } 
})

//UPDATE(IN DATABASE) ROUTES
app.patch("/user/:id/",(req,res)=>{
    let {password: formpass,username:newName}=req.body;
    const{id}=req.params;
    let q=`SELECT * FROM user WHERE id ="${id}"`;
    // console.log(id)

    try{ 
        connection.query(q,(err,results)=>{ 
                if (err) throw err;
                let detail=results[0];
                console.log(results[0]);
                if (formpass!=detail.password){
                    res.send('worng password');
                }
                else{
                    let q2=`UPDATE user SET username="${newName}" WHERE id="${id}"`;
                    connection.query(q2,(err,results)=>{
                        if(err) throw err;
                        res.redirect("/user");
                        
                })
            }
                // let user=results[0];
                // res.render("edituser.ejs",{user});
            });
        }
        catch(err){
            console.log(err);
            res.send("some err")
        } 
})


//form to add new user

app.get("/user/newuser/",(req,res)=>{
    res.render("adduser.ejs");
    // const{id}=req.params;
    // let q=`SELECT * FROM user WHERE id ="${id}"`;
    // console.log(id)
})
 
//add data in db
app.post("/user/newuser/",(req,res)=>{
    let { passwords: forpass, username: newName, email: newemail } = req.body;
    let newid =uuidv4();
    let q = `INSERT INTO user (ID, USERNAME, EMAIL, PASSWORD) VALUES ('${newid}','${newName}','${newemail}','${forpass}')`;
    console.log(user)
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.redirect("/user");
        });
    } catch (err) {
        console.log(err);
        res.send("some error");
    }
});

app.get("/user/:id/delete",(req,res)=>{
    const{id}=req.params;
    let q=`SELECT * FROM user WHERE id ="${id}"`;
    console.log(id)
    try{ 
        connection.query(q,(err,results)=>{ 
                if (err) throw err;
                //this.results()
                // console.log(results[0]);
                let user=results[0];
                res.render("deleteuser.ejs",{user});
                
            });
        }
        catch(err){
            console.log(err);
            res.send("some err")
        } 
});
app.delete("/user/:id/",(req,res)=>{
    // let {password: formpass,username:newName}=req.body;
    const{id}=req.params;
    const {email,password}=req.body
    let q=`SELECT * FROM user WHERE id ="${id}"`;
    // console.log(id)
    try{ 
        connection.query(q,(err,results)=>{ 
                if (err) throw err;
                let detail=results[0];
                console.log(results[0]);
                if ((password!=detail.password) & (email!= detail.email)){
                    res.send('invalid details');
                }
                else{
                    let q2=`DELETE FROM user WHERE id="${id}"`;
                    connection.query(q2,(err,results)=>{
                        if(err) throw err;
                        console.log(results);
                        
                        res.redirect("/user");
                        
                })
            }
                // let user=results[0];
                // res.render("edituser.ejs",{user});
            });
        }
        catch(err){
            console.log(err);
            res.send("some err")
        } 
})




app.listen(8080);




// let q = "INSERT INTO user (ID,USERNAME,EMAIL,PASSWORD) VALUES ?";
// let getRandom=() => {
//     return[
//             faker.string.uuid(),
//             faker.internet.userName(),
//             faker.internet.email(),
//             faker.internet.password(),
//     ];
// };
// let userS= [];
// for (let index = 0; index <= 100; index++) {
//     userS.push(getRandom());    
// }

// 
// finally{
//     connection.end();
// }

// // console.log(getRandom());