const{ faker }=require("@faker-js/faker");
const mysql2=require('mysql2');

const connection=mysql2.createConnection({
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"147852"
});

try{
    connection.query("SHOW TABLES",(err,results)=>{
        if (err)throw err;
        //this.results()
        console.log(results);
    })
}
catch(err){
    console.log(err);
}
connection.end();
let getRandom=() => {
    return{
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}
// console.log(getRandom());