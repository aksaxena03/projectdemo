import express from 'express'
import {Router} from 'express'
import { Account,User } from '../SchemaDb'
import { authMiddleware } from '../middilware'
import mongoose from 'mongoose'
const router =Router()

router.get('/balance',authMiddleware,async(req:express.Request,res:express.Response)=>{
   try{ const userid =req.userid
    if(!userid){
        res.status(408).send('unable to fetch data from db')
        return
    }
    const user =await User.findOne({_id:userid})
    const account =await Account.findOne({userid})
     if (!account) {
            res.status(404).json({ error: 'Account not found' })
            return
        }
        // console.log(account?.balance,user?.name)
    res.json({"balance":account?.balance,"user":user?.name})}
    catch(e){
        res.status(404).send(e)
    }
})

router.post('/transfer', authMiddleware, async (req: express.Request, res: express.Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{const {amount, to} = req.body;
         if (to === req.userid) {
        await session.abortTransaction();
        res.json({ message: "Cannot Transfer to yourself!" });
        return
  }
    
    if (!to || amount <= 0) {
        res.status(400).json({ message: 'invalid input' });
        await session.abortTransaction();
        return;
    }
    const sender = await Account.findOne({userid: req.userid}).session(session);
    if (!sender || !sender.balance || sender.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({ message: "Insufficient balance or sender not found" });
        return;
    }
    
    const receiver = await Account.findOne({userid: to}).session(session);
    if (!receiver) {
        await session.abortTransaction();
        res.status(404).json({ message: "Receiver not found" });
        return;
    }
    
    await Account.updateOne({userid: req.userid}, {$inc: {balance: -amount}}).session(session);;
    await Account.updateOne({userid: to}, {$inc: {balance: amount}}).session(session);;
    await session.commitTransaction();
    const senderCHange = await Account.findOne({userid: req.userid});

    res.json({ message: "Transfer successful. your bal is "+ senderCHange?.balance});}
    catch(e){res.send(e)}
})
export default router;