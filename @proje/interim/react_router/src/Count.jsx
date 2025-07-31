import { createContext, useContext, useState } from "react"
//context api is used to acces value from top level of layer (like app.jsx) to the lower level of layer .
// it is use to avoid prop drilling(we pass prop layer by layer to use prop in componet )

//it have a DISADVANTAGE it will rerander every component

// it divide in 3 steps;- 
// (i)create context,(ii)intialze and wrap (wrap the componet inside(like children) it ),(iii)use context by deStructring it 
const countContext= createContext()                                  //create context
export default function Count() {
    const [counting, setCounting] = useState(0)
    return (
        <>
            <countContext.Provider value={{                          //intialze context value
                counting:counting
            }}>
            <Counter />
            <Increase />
            <Decreaser />
            </countContext.Provider>
        </>
    )
    function Counter() {
        let {counting}=useContext(countContext)                       //using context to get couting value
        return (
            <div>{counting}</div>
        )
    }
    function Increase() {
        const { counting } = useContext(countContext)               //use context by 
        let inc = () => {
            setCounting(c => c + 1)
        }
        return (
            <button onClick={inc}>{`increase ${counting}`}</button>
        )
    }
    function Decreaser() {
        let dec = () => {
            setCounting(c => c - 1)
        }
        return (
            <button onClick={dec}>decreaser</button>
        )
    }
}