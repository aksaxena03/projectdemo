import { useState } from "react";
import GenLotterteckit from './GenLotterteckit'
import Teckit from "./Teckit";

export default function Lottery({n, winnigNum }){
    let [teckit,setTeckit]=useState(GenLotterteckit(n))
    let iswinnigNum = (teckit.reduce((sum,curr)=>sum+curr,0))=== winnigNum;

    console.log(iswinnigNum,winnigNum,(teckit.reduce((sum,curr)=>sum+curr,0)))
    let btn=()=>{
        setTeckit(GenLotterteckit(n))
    }

    
    return(
        <div>
            <h2> Lottery Game</h2>
            
            <h3><Teckit teckit={teckit}/></h3>
            <button onClick={btn}>{iswinnigNum?"buy again": "try ur luck again"}</button>
            <h3>{iswinnigNum?"hurry u did it":""} </h3>
        </div>

    )
}