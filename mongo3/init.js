const mongoose = require('mongoose');
const path = require('path')
const Chat = require("./models/chat.js")


main().then(() => { console.log('mongo connected') }).catch(err => { console.log(err) });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


Chat.insertMany([
    { from: 'akhil', to: 'ak', msg: 'hey whatsup', created: new Date() },
    { from: 'ak', to: 'akhil', msg: 'hey ', created: new Date() },
    { from: 'shivam', to: 'ak', msg: 'hi', created: new Date() },
    { from: 'shivani', to: 'ak', msg: 'hee', created: new Date() },
    { from: 'deeksha', to: 'ak', msg: 'whatsup', created: new Date() },
]);

// const chat1=new Chat({
//     from:'akhil',to:'ak',msg:'hey whatsup',created:new Date()
// })
// chat1.save();