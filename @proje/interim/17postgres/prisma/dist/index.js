"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const Client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.get("/sign/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const ps = yield Client.user.findFirst({
        where: { id: parseInt(id) },
        include: {
            todos: true
        }
    });
    console.log(ps);
    res.json({ ps });
}));
app.listen(8080, () => {
    console.log('listen to 8080');
});
