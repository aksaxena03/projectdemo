import { useState } from "react"

export default function Forms(){
    let [datas,setDatas]=useState({
        name:'',
        username:'',}
    )
    
    let oninputChange=(event)=>{
        let ipName=event.target.name
        let newval=event.target.value
        setDatas((curr)=>{
            curr[ipName]=newval
            return{...curr}
        })
        // console.log(datas)
    }
   let handelsubmit=(event)=>{
        console.log(datas)

        setDatas({
            name:'',
            username:'',
        })
        
    }
    
    return(
        <>
       <form action="" onSubmit={(event)=>{event.preventDefault();}}>
        <label htmlFor="name" id="name">Name</label>
            <input type="text" placeholder="enter your name" id="name" value={datas.name} name="name" onChange={oninputChange}/>
            <br /><br />
            <label htmlFor="username" id="username">userName</label>
            <input type="text" placeholder="enter your user name" id="username" value={datas.username} name="username" onChange={oninputChange}/>
            <br /><br /><br />
            <button onClick={handelsubmit} >submit</button>
       </form>
        </>
    )
}