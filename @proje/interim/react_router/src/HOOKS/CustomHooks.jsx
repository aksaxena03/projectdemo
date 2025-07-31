import { useState } from "react"

//Custom hook is function hook which is intial use as all other hooks and 
//it use hook inside hook

function useCount(){                            //creation of custom hook
    const [counting, setCounting] = useState(0) //intialize other predefined hook 
    
    function Increase() {
            setCounting(c => c + 1)
    }
    return({
        Counting:counting,
        Increase:Increase
    })
}
export default function CustomHooks() {
   
    return (
    <><Count/>
    <Count/>

    <Count/>
    <Count/>
</>

    )

function Count(){
    let {Counting,Increase}=useCount()
    return(
        <>
           <button onClick={Increase}>Increase{Counting}</button>
        </>
    )
}
   
}