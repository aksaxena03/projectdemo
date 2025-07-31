import Jwt, { JwtPayload }  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwt_password } from './config'

export const auth=(req:Request, res:Response, next: NextFunction)=>{
    const header =req.headers["authorization"]
    const decode =Jwt.verify(header as string,jwt_password) as JwtPayload
    // console.log(header ,decode)
    if(decode){
            //@ts-ignore
        req.userId=(decode.id)
        // console.log(decode.id)
        next()
    }else{
        res.status(401).json({
            message: "you need to log in"
        }) 
    }

}
