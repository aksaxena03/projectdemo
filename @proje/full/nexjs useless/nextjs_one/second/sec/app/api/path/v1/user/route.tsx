import { NextResponse ,NextRequest} from "next/server";
import {PrismaClient} from '@prisma/client'
const prismaClient =new PrismaClient()
export function GET(){
    return NextResponse.json({
        username:"AKakhil",
        password:"AKabcdefghijklmnopqrstuvwxyz"
    })
}
export async function POST(req:NextRequest){
    const data = await req.json()
    console.log(data)
    const respond =await  prismaClient.username.create({
       data: {username:data.username,password:data.password}
    })
    return NextResponse.json({
        msg:"done"
    })
}