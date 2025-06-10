import { memo, useEffect, useState } from "react"

export default function Memocount(){
    function Counter(){
        let [count,setCount]=useState(0)
        useEffect(()=>{
            setInterval(()=>{
                setCount(c=>c+1)
            },2000)
        })
        const Num=memo(function(){
        return( 1)
    })
    const Dec=memo(function(){
        function dec(){
            setCount(c=>c-1)
            console.log(count)
        }

        return( <><button onClick={dec}>dec</button></>)
    })
    const Inc=memo(function(){
        function inc(){
            setCount(c=>c+1)
            console.log(count)
        }
        return( <><button onClick={inc}>Inc</button></>)
    })
        return(<>
        <Num></Num>
        <Inc></Inc>
        <Dec></Dec>
        </>)
    }
    
    return(
        <Counter/>
    )
}