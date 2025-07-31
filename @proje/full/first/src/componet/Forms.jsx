import { useState } from "react"

export default function Forms(){
    const [dob,setDob]=useState()
    let val=(e)=>{
        console.log(e.target.value)
        setDob(e.target.value)
    }
    
    return(
        <>
        <form onSubmit={(e)=>{e.preventDefault()}} className='p-2 flex flex-col'>
        <input type="date" name="" id=""  onChange={val} className='bg-slate-600 hover:bg-violet-600 ... py-2 px-2 rounded-full ' placeholder='your birth year' />
        <br /><button type="submit" className='bg-slate-600 hover:bg-violet-600 ... rounded-full m-auto justify-center cursor-pointer text-2s w-full py-2'>continue</button>
        {dob ==""?<p> invalid age</p>:dob > "2000-01-01" ? <p>u can apply</p> : <p> invalid age</p>}
        </form>
        </>
    )
}