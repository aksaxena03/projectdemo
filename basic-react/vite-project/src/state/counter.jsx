import { useState } from "react";




export default function Counter(){
    let [islike,setIslike]=useState(false)
    let liking=()=>{
        setIslike(!islike)
        
    }
    let style={color:"red"}
    return(
        <>
            <h2>Click to like</h2>
            <p onClick={liking}>
              <h1 style={style}>  {
                     islike ?(<i className="fa-regular fa-heart"></i>):( <i className="fa-solid fa-heart"></i>)
                    }
                </h1>
                {/* <p>{islike.toString()}</p> */}
            </p>
        </>
    )

    //===on screen counter by useState
    // let [count,setCount]=useState(0)  // count is used as variable and setCount is used to increse the counter and re-reander

    // let inCount=()=>{
    //     setCount(count+=1)
    // }
    // return(
    //     <> 
           
    //        <h1>{count}</h1>

    //         <button onClick={inCount}>click me!</button>
           
    //     </>
    // )
}