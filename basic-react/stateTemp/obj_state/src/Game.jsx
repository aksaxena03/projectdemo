import { useState } from "react";
import {genThreeNum,sum} from "./Logic";

function Game(){
    let [arr,setArr]=useState(genThreeNum(3))
    let iswinning=(sum(arr) === 15) 
    let again=()=>{
        setArr(genThreeNum(3))
    }
    // arr=genThreeNum(3);
    // // console.log(arr)
    // console.log(sum(arr)==15)
    // console.log("cong" && sum(arr)==15)

return(
    <>
    <h1>Game</h1>
    <h3 className="num">

        <span className="ranNum">{arr[0]}</span>
        <span className="ranNum">{arr[1]}</span>
        <span className="ranNum">{arr[2]}</span>
    </h3>
    <button onClick={again}>buy more</button>
    <h4>{iswinning? "Congratulations!" : "Try again!"}</h4>
    </>
)
}
export default Game; 