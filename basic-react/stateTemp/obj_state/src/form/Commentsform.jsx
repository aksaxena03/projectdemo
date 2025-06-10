import { useState } from "react"

export default function Commentsform(){
    let [data ,setData]=useState({
        Username:'',Remark:'',Rating:'',
    })
    let HandlerInput=(event)=>{
        let ipOption=event.target.name
        let ipData=event.target.value
        // console.log(ipData,ipOption)
        setData((curr)=>{
            curr[ipOption]=ipData
            return { ...curr}
        })

    }

    return(
        <>
            <h2>Give a comments</h2>
            <form action="" onClick={(event)=>{
                event.preventDefault();
                console.log(data)
            }}>
                <label htmlFor="Username">Username</label>
                <input type="text" id="Username"  value={data.Username} onChange={HandlerInput} name="Username"/> <br />
                <label htmlFor="Remarks">Remarks</label>
                <textarea  id="Remarks"  value={data.Remark} onChange={HandlerInput} name="Remark"></textarea><br />
                <label htmlFor="Rating">Rating</label>
                <input type="number" min={1} max={6} id="Rating"  value={data.Rating}onChange={HandlerInput} name="Rating"></input><br />
                <button>submit</button>
            </form>
        </>
    )
}