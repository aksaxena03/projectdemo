import { WebSocketServer, WebSocket } from "ws";

interface SocketConnection {
    name:string;
    socket: WebSocket;
    room: string;
}
const allSocket: SocketConnection[]=[]

const wss=new WebSocketServer({port:8080})

wss.on("connection",(socket)=>{
socket.on("message",(message)=>{
    //@ts-ignore
    const parsMsg=JSON.parse(message)
    if(parsMsg.type=="join"){
        console.log(parsMsg.payload.name)
        allSocket.push({
            socket,name:parsMsg.payload.name,room:parsMsg.payload.roomid
        })
    }
    if(parsMsg.type=="chat"){
        // const currentUserRoom=allSocket.find((x)=>x.socket==socket).room
        let currentUserRoom=null
        for(let i=0;i<allSocket.length;i++){
            // let s=allSocket[i].room
            if(allSocket[i].socket==socket){
               currentUserRoom= allSocket[i].room
            }
        }
        for(let i=0;i<allSocket.length;i++){
            if(allSocket[i].room==currentUserRoom){
                console.log(parsMsg.payload.name +"chat")
                allSocket[i].socket.send(parsMsg.payload.message)
            }
        }

    }
})











})




// import { WebSocketServer, WebSocket } from "ws";

// const wss = new WebSocketServer({ port: 8080 });
// console.log('ws://localhost:8080')
// let usercount = 0;
// let allSocket: WebSocket[] = []
// // let brMsg=[]
// wss.on("connection", (socket) => {
//     allSocket.push(socket)
//     usercount = usercount + 1;
//     socket.on("message", (Message) => {
//         for (let i = 0; i < allSocket.length; i++) {
//             const s = allSocket[i]
//             s.send(Message.toString() + "from sever")
//         }
//         // brMsg.push(Message.toString())
//         //   for (let index = 0; index < brMsg.length; index++) {

//         //     socket.send(brMsg[index])
//         // }
//     })


// })




