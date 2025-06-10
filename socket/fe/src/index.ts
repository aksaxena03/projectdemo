import ws, { WebSocketServer } from "ws"

const wss=new WebSocketServer({port:8080})

wss.on("connection",function (socket){
console.log("socket connected at 8080 port")

socket.on("message",(e)=>{
if(e.toString()==="ping"){
  socket.send('pong')
}})

})