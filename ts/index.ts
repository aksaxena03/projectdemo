import express from 'express'
import mongoose from 'mongoose'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { ContentModel, LinkModel, UserModel } from './db'
import { auth } from './middilware'
import { jwt_password } from './config'
import { SupervisedUserCircleOutlined } from '@mui/icons-material'
import { random } from './utils'
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cors());

app.post("/api/v1/signup",async(req ,res)=>{
    const username= req.body.username
    const password=req.body.password
    try{
        await UserModel.create(
        { username:username,password:password}
        )
        res.json({ message: 'User created successfully' })
    }catch(e){
         res.status(404).json({message:"user exists"})

    }

})
app.post("/api/v1/signin",async(req ,res,next)=>{
    const {username,password}=req.body
    try{
        const existing = await UserModel.findOne({username,password})
        //  if (username!==verfying.username && password!=verfying.password)
        //     {
        //         res.send{"Invalid username and password"}
        //     }
        if (existing) {
            // console.log(existing.id,jwt_password)
            const token=jwt.sign({id:existing.id},jwt_password)
            // console.log(token)
            res.json({token})
            next()
        } else {
            res.json({message:"Invalid username and password or credentials"})
        }
    }catch(e){
            res.status(404).json({message:'user not found'})
    }
})
app.post('/api/v1/content',auth,async(req,res)=>{
    const link=req.body.link
    const title=req.body.title
    const Type =req.body.Type
    await ContentModel.create({
        link,
        title,
        Type,
        tags: [],
        //@ts-ignore
        userId:req.userId
    })
    res.json({message:'content added'})
    
})
app.get('/api/v1/content',auth,async(req,res)=>{
    //@ts-ignore
    const userId= (req.userId )
    const content=await ContentModel.find({userId}).populate("userId","username")
    // console.log(content)
    res.json({content});
})  

//Delete content
// ...existing code...

app.delete('/api/v1/content',auth,async(req, res) => {
    try {
        const { contentId } = req.body.data;
        //@ts-ignore
        const userId = req.userId; // Remove @ts-ignore by properly typing req

        console.log(`Deleting content: ${contentId} for user: ${userId}`);

        const result = await ContentModel.deleteOne({
            _id: contentId,
            userId
        });

        if (result.deletedCount === 0) {
            res.status(404).json({ 
                message: 'Content not found or unauthorized' 
            });
            return;
        }

        res.json({ message: 'Content deleted successfully' });
        return;
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ 
            message: 'Failed to delete content'
        });
        return;
    }
});

// ...existing code...
app.post('/api/v1/content/share',auth,async(req,res)=>{
    let share=req.body.share;
    if (share=="true"){
        const existinglink=await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        });
        if(existinglink){
            console.log(existinglink)
            res.json({
            hash:`/api/v1/content/${existinglink.hash}`})
            return;
        }
        const hash= random(10);
        console.log(`( ${hash} )`)
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId
            ,hash:hash    
        })
        res.json({hash:`/api/v1/content/${hash}`})
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        })
        res.json({message:"share link removed"} )
    }
     
})
app.get('/api/v1/content/:sharelink',async(req,res)=>{
    const hash=req.params.sharelink;

    const link=await LinkModel.findOne({hash})
    if(!link){
        res.status(141).json({message:"link is broken"})
        return
    }
    //userid se content fetch
    const content=await ContentModel.find({userId:link.userId})
    const user=await UserModel.findOne({_id:link.userId})
    if(!user){
        res.json({message:"user not found or maybe users link is not found"})
        return
    }
    res.json({
        userId:link.userId,
        username:user.username,content:content,
    })
    

    
})

app.listen(3000);