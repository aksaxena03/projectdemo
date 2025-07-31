import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef=useRef<any>("")
  const wsRef=useRef<any>(null)
  const [msg,setMsg]=useState(["hi,buddy"])
  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:8080")
    ws.onmessage=(event: MessageEvent)=>{
      setMsg((e)=>[...e,event.data as string])
    }
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomid: "red"
        }
      }))
    }
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    }
    wsRef.current=ws;

  },[])
  function send(){
    wsRef.current.send(JSON.stringify({
          type: "chat",
          payload: {
            name: "akhl",
            message: inputRef.current.value
          }
        }))
        inputRef.current.value=""
 }

  return (
    <>
      <div className="bg-black h-screen w-screen flex flex-col ">
        <div className="m-auto flex flex-col w-1/3 h-6/8 bg-gray-900 rounded-3xl">
          <div className=" flex flex-col h-full overflow-y-scroll"> 
            {msg.map((m:string, index:number)=> <div className='w-fit text-black p-4 bg-amber-50 rounded-3xl rounded-tr-sm' key={index}>{m}</div>)}
          </div> 
          <div className="bottom-0 flex mt-5 mx-auto px-3.5 rounded-t-2xl h-10 w-fit bg-gray-600">
            <input className='bg-gray-600 text-amber-50' ref={inputRef } type="text" name="msg" id="msg" />
            <button className='text-amber-50 bg-gray-600' onClick={send} id='msg' name='msg'>Send</button>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
