import {PrismaClient} from  '@prisma/client'
//@ts-ignore
const prisma =globalThis.prisma?? new PrismaClient();
if(process.env.node_env!="production")globalThis.prisma=prisma

export default prisma


//skeleton plan concept