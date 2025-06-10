"use client"
import axios from 'axios'
import { useState } from "react"
import Inputs from "../componet/Input"
export default function Signup(){
    let [username,setUsername]=useState("")
    let [password,setPassword]=useState("")
    return(

        <div className="">
            
                <Inputs onChange={e=>setUsername(e.currentTarget.value) } label="Username" placeholder="username" type="text" name="username"/>
                <Inputs onChange={e=>setPassword(e.currentTarget.value)} label="Password"  placeholder="Password" type="password" name="password" />
                <button type="submit" onClick={()=>{
                    axios.post("http://localhost:3000/api/path/v1/user",{
                        username,
                        password
                    })
                }}>Signup</button>
        </div>

        
//by using DOM 

        // <div className="">
        //     <form onSubmit={(e) => { e.preventDefault();
        //     const formData = new FormData(e.currentTarget);
        //     const username = formData.get('username');
        //     const password = formData.get('password');
        //     // Now you can use username and password values
        //     console.log({ username, password });
        //     }}>
        //     <Inputs 
        //         label="Username" placeholder="username" type="string" name="username" // Add name attribute
        //     />
        //     <Inputs 
        //         label="Password"  placeholder="Password" type="password" name="password" // Add name attribute
        //     />
        //     <button type="submit">Signup</button>
        //     </form>
        // </div>
    )
}