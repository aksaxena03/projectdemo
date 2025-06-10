import express from "express"
import { Client } from "pg"
const app=express()
app.use(express.json())
const pgClient=new Client("postgresql://neondb_owner:npg_ia2M3ZBsHyNA@ep-rough-sound-a1a1enif-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require") 
   pgClient.connect().then(()=>{console.log('database connected')}).catch((e)=>console.log(e))

app.post('/signin',async(req,res)=>{

   try{ 
       const QUERY='INSERT INTO "user" (username,password,name) VALUES ($1, $2, $3) RETURNING id;'
    
    const {username,password,name,todos}=req.body
    // console.log(username,password,name)
    await pgClient.query("BEGIN;")
    const responses=await pgClient.query(QUERY,[username, password, name]);
    const userTableId=responses.rows[0].id
    // console.log(userTableId)
    const totodo=await pgClient.query(`INSERT INTO "TODO"(userid,todos) VALUES($1, $2)`,[userTableId,todos])
    res.json(responses.rows[0])
    await pgClient.query("COMMIT;")    
    }
    catch(error: any){
        res.json({error: error.message})
    }
})
app.get('/join',async(req,res)=>{
    const ids=req.query.id
    const qu=`SELECT "user".id,"user".username,"user".password,"user".name,"TODO".userid,"TODO".todos FROM "user" JOIN "TODO" ON "user".id ="TODO".userid 
    WHERE "user".id=$1;`

    // other way by seting "user"="u" and "TODO"="T"
    // const qu=`SELECT "u".id,"u".username,"u".password,"u".name,"T".userid,"T".todos FROM "user" AS "u" JOIN "TODO" AS "T" ON "u".id ="T".userid WHERE "u".id=$1;`
    
    const response=await pgClient.query(qu,[ids]);
    res.json({response:response.rows})
    
})
app.listen(3000,()=>{console.log("deploy" )})




























// import { Client } from "pg";
// const pgClient=new Client("postgresql://neondb_owner:npg_ia2M3ZBsHyNA@ep-rough-sound-a1a1enif-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require")

// async function main (){
// await pgClient.connect()
// // const resposne=await pgClient.query('INSERT INTO ""user""(id,name,password,username) VALUES (47,\'akhil\',\'asdfhlk\',\'asdfs\')')
// // const resposne= await pgClient.query('SELECT * FROM ""user""')
// // console.log(resposne.rows)
// // const response =await pgClient.query('SELECT (id ,username) FROM ""user""')
// // const response=await pgClient.query('UPDATE ""user"" set username=\' akhilesh\' WHERE username=\'aksaxena03332gmail.com\'')
// // const response=await pgClient.query('DELETE FROM ""user"" WHERE username=\' akhilesh\'')
// console.log(response)
// }
// main()
