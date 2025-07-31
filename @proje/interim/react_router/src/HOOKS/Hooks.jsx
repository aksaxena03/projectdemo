import { useState } from "react"
import usePrev from './UsePrev'

export default function Hooks(){
    let [value,setValue]=useState(0)
    let prev=usePrev(value)

    function Update (){
        setValue(c=>c+1)
    }

    
    return(
       <>
        <h4>{value}</h4>
        <button onClick={Update}>Update</button>
        <p>prev value - {prev}</p>
       </>
    )
}