"use strict";
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
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_ia2M3ZBsHyNA@ep-rough-sound-a1a1enif-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");
pgClient.connect().then(() => { console.log('database connected'); }).catch((e) => console.log(e));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const QUERY = 'INSERT INTO "user" (username,password,name) VALUES ($1, $2, $3) RETURNING id;';
        const { username, password, name, todos } = req.body;
        // console.log(username,password,name)
        yield pgClient.query("BEGIN;");
        const responses = yield pgClient.query(QUERY, [username, password, name]);
        const userTableId = responses.rows[0].id;
        // console.log(userTableId)
        const totodo = yield pgClient.query(`INSERT INTO "TODO"(userid,todos) VALUES($1, $2)`, [userTableId, todos]);
        res.json(responses.rows[0]);
        yield pgClient.query("COMMIT;");
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
app.get('/join', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.query.id;
    const qu = `SELECT "user".id,"user".username,"user".password,"user".name,"TODO".userid,"TODO".todos FROM "user" JOIN "TODO" ON "user".id ="TODO".userid 
    WHERE "user".id=$1;`;
    // other way by seting "user"="u" and "TODO"="T"
    // const qu=`SELECT "u".id,"u".username,"u".password,"u".name,"T".userid,"T".todos FROM "user" AS "u" JOIN "TODO" AS "T" ON "u".id ="T".userid WHERE "u".id=$1;`
    const response = yield pgClient.query(qu, [ids]);
    res.json({ response: response.rows });
}));
app.listen(3000, () => { console.log("deploy"); });
// import { Client } from "pg";
// const pgClient=new Client("postgresql://neondb_owner:npg_ia2M3ZBsHyNA@ep-rough-sound-a1a1enif-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require")
// async function main (){
// await pgClient.connect()
// // const resposne=await pgClient.query('INSERT INTO ""user""(id,name,password,username) VALUES (47,\'akhil\',\'asdfhlk\',\'asdfs\')')
// // const resposne= await pgClient.query('SELECT * FROM ""user""')
// // console.log(resposne.rows)
// // const response =await pgClient.query('SELECT (id ,username) FROM ""user""')
// // const response=await pgClient.query('UPDATE ""user"" set username=\' akhilesh\' WHERE username=\'aksaxena03332gmail.com\'')
// // const response=await pgClient.query('DELETE FROM ""user"" WHERE username=\' akhilesh\'')
// console.log(response)
// }
// main()
