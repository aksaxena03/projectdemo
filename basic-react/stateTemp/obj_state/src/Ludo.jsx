import { useState } from "react"
function LudoKey({ name, steps, style, onClick }){
    return(
       <div>
            <p>{name} moves- {steps}</p>

            <button onClick={onClick} style={{backgroundColor:name, ...style}}>
                <p>+1</p>
            </button>
            <br />
            
       </div>
    )
} 

// main fun
export default function Ludo(){
    let [click,setClick]=useState({red:0 , green:0 , blue:0 ,yellow :0})
    let [heading, setHeading]=useState({msg:""})
    let [arr, setArr]=useState(['no moves'])

    let clicksblu=()=>{
        setClick({...click, blue: click.blue + 1});
        setHeading({msg: "blue moves"})
        arr.push("blue moves")
        setArr(arr)
        console.log(arr)
        // console.log(click.blue);
    }
    let clicksylo=()=>{
        setClick({...click, yellow: click.yellow + 1});
        // console.log(click.blue);
        setHeading({msg: "yellow moves"})
        arr.push("yellow moves")
        setArr(arr)
        console.log(arr)
    }
    let clicksrd=()=>{
        setClick({...click, red: click.red + 1});
        // console.log(click.blue);
        setHeading({msg: "red moves"})
    }
    let clicksgrn=()=>{
        setClick({...click, green: click.green + 1});
        // console.log(click.blue);
        setHeading({msg: "green moves"})
    }

   

    return(
        <> <h1>{heading.msg}</h1>
            <h2>{arr[arr.length - 1]}</h2>
            <LudoKey onClick={clicksrd} name="red" steps={click.red} />
            <LudoKey onClick={clicksblu}  name="blue" steps={click.blue} />
            <LudoKey onClick={clicksylo}  name="yellow" steps={click.yellow} style={{color:"black"}} />
            <LudoKey onClick={clicksgrn}  name="green" steps={click.green} />
            
        </>
    )
}