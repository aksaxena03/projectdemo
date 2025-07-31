import { useRef, useState } from "react"
export default function Clock_by_useRef() {
    let [val, setVal] = useState(0)
    let inpval = useRef() // useRef is used update value but did not re-rander the variale
    let Start = () => {
        let inp = setInterval(function () {
            setVal(c => c + 1)
        }, 1000)
        inpval.current = inp
    }
    function Stop() {
        clearInterval(inpval.current)
    }
    return (
        <>
            {val} <br />
            <button onClick={Start}>Start</button>
            <button onClick={Stop}>Stop</button>
        </>
    )
}