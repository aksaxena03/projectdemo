// import {PrismaClient} from "@prisma/client" 
// const Client =new PrismaClient()
// async function createUser(){
// // const resp=await Client.user.delete({
// //     where:{id:1}
// // })
// // console.log(resp)
// // const resp=await Client.user.findFirst({
// //     where:{username:"akhil"}
// //      ,Select:{           |
// //      password:true       |   for selective data to show
//     //}                     |
// // })
// // console.log(resp.password)|

// // const resp=await Client.user.update({
// //     where:{username:"akhilsgjh"},
// //     data:{
// //         name:"sukh"
// //     }
// // })
// // console.log(resp)


// const rs=await Client.user.create({
//     data:{
//     name:"akhihli",
//     username:"akhkljilsgjh",
//     password:"asdfghjkhjjkl;",
//     city:"dhamp",
//     todos:{create:{
//         id:1,
//         todo:"hey yo",
//         isdone:false
//     }}
// }
// })
// console.log(rs)
// }

// createUser()



//      ******************use in with expresss*************************


import express from "express"
import { PrismaClient } from "@prisma/client"
const Client=new PrismaClient()

const app=express()


app.get("/",async(req,res)=>{
    const users=await Client.user.findMany()
    console.log(users)
    res.json({users})
})

app.get("/sign/:id",async(req,res)=>{
    const id =req.params.id
    const ps=await Client.user.findFirst({
        where:{id:parseInt(id)},
        include:{
            todos:true
        }
    })
    console.log(ps)
    res.json({ps})

})
app.get("/del/:id",async(req,res)=>{
    const id =req.params.id
    const rs =Client.user.delete({
        where:{
            id:parseInt(id)
        }
    })
    console.log(rs)
    res.json({rs})
})
app.get("/update/:id/:username",async(req,res)=>{
    const id =req.params.id
    const username =req.params.username

    const rs =Client.user.update({
        where:{
            id:parseInt(id)
        },
        data:{
            todos: {
                updateMany: {
                    where: {},
                    data: { isdone: true }
                }
            }
        } 
    })
    console.log(rs)
    res.json({rs})
})

app.listen(8080,()=>{
    console.log('listen to 8080')
})