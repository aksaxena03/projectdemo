import express from 'express'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import {User,Account} from './../SchemaDb'
import zod from 'zod'
import {authMiddleware} from './../middilware'
import { isColonToken } from 'typescript'

const router = Router()

const signuping = zod.object({
    name: zod.string(),
    password: zod.string(),
    email: zod.string().email(),
    phone_number: zod.string()
})

router.post('/signup', async (req: express.Request, res: express.Response) => {
    // console.log(req.body)
    try{const validation = signuping.safeParse(req.body);
        if (!validation.success) 
        { res.status(408).send('invalid signup credentiol ')
        return }
    const { name, password, email, phone_number } = req.body
    const data={ name, password, email, phone_number }
    const findUser = await User.findOne({email:data.email})
            if(findUser){
                res.send("user is existed")
                return;
            }
    const user = await User.create({name, password, email, phone_number})
    // console.log(user)
    if (user) {
        const userid =user._id
        await Account.create({
            userid:userid,
            balance:1+Math.random()*10000
        })
        const token=jwt.sign({userid}, process.env.JWT_SECRET || 'fallback-secret-key');
        // console.log(token)
        
        res.json({ message: 'User added successfully', token });
        return;
    }
    res.send('invalid detail');
}
catch(error){
    // console.log(`error: ${error}`)
    // console.error()
    res.send(error)    
}
})
const signining = zod.object({
    password: zod.string(),
    email: zod.string().email(),
})
//@ts-ignore
router.post('/signin', async (req: express.Request, res: express.Response)=> {
    try {
        const validation = signining.safeParse(req.body);
        if (!validation.success) {
             res.status(400).json({ 
                error: 'Invalid credentials format'
            });
        }

        const {password, email } = req.body
        const user = await User.findOne({email:email, password:password})
        // console.log(user)
        if (!user){
             res.status(401).json({ 
                error: 'Invalid email or password'
            });
            return;
        }
        const token = jwt.sign({userid:user?._id}, process.env.JWT_SECRET ||'fallback-secret-key')
        res.json({
            message: 'Signin successful',
            token
        });
    }
    catch(e){
        // console.log(e)
        return res.status(400).json({error: 'Invalid credentials'});
    }
})

const updating = zod.object({
    email:zod.string(),
    name: zod.string(),
    password: zod.string()
})
router.put('/update',authMiddleware,async(req: express.Request, res: express.Response) => {
    if(!(updating.safeParse(req.body)).success){
        res.status(403).send('invalid data')
    }
    const { email, name, password } = req.body;
    // Assuming authMiddleware sets req.userid
    const data = await User.updateOne(
        { _id: req.userid }, // filter by authenticated user's id
        { $set: { email, name, password } }
    );

    res.send('update successful');
})

router.get("/bulk", async (req, res) => {
    const filter = (req.query.filter as string) || "";

    try {
        const users = await User.find({
            $or: [
                { email: { $regex: filter } }
            ]
        });

        res.json({
            users: users.map((user: any) => ({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                _id: user._id
            }))
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', (req: express.Request, res: express.Response) => {
    // On the backend, you can't access localStorage.
    // To "logout", instruct the client to remove the token.
    res.send('logout successfully')
});

export default router;
