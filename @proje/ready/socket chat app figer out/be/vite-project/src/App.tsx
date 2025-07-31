import { useEffect, useRef, useState } from 'react'
import './App.css'
function App() {
const [skt,setSkt]=useState<any>()
const inputRef=useRef<any>(null)
function send(){
  if(!skt){return;}
const val =inputRef.current.value

  skt.send(val)
  
}
  useEffect(()=>{
    const ws =new WebSocket("ws://localhost:8080")
    setSkt(val)
    console.log(val)
    ws.onmessage=(ev)=>{
      alert(ev.data)
    }
  },[])

  return (
    
    <div>
      <input ref={inputRef} type="text" name="game" id="" />
      <button name='game' onClick={send} >submit</button>
     
    </div>
  )
}

export default App
