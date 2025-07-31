import { Router } from 'express'
import userRouter from './../router/user'
import accRouter from './../router/account'

const router = Router();

router.use('/user',userRouter)
router.use('/account',accRouter)

export default router;
