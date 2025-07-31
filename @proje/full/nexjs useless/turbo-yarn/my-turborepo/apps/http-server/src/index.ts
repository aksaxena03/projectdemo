import express from 'express'
const app =express();

app.get('/chat',(req,res)=>{
    console.log('hello')
})

app.listen(3001,()=>{console.log(' at 3001')
})