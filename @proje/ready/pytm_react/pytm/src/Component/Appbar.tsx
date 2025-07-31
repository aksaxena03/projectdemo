import axios from "axios"
import { useNavigate } from "react-router-dom"
interface us{
    user:string
}

export default function Appbar({user}:us){
    const navi=useNavigate()
    return(
        <div className="flex flex-row relative shadow-2xs justify-between rounded-b-2xl top-0 w-screen h-max items-center py-3">
            <div className="px-2.5 text-xl font-semibold justify-center">Paytm App</div>
            <div className="px-2.5 flex flex-row items-center">
                <div className="mr-3"><button onClick={()=>{
                        axios.post('http://localhost:3001/api/v1/user/logout')
                        localStorage.removeItem('token')
                        alert('logout successfull')
                        navi('/signin')
                }}>Logout</button></div>
                
                
                Hello, 
                &nbsp; 
                <div className="bg-green-400 text-white font-semibold rounded-full h-8 w-8 flex items-center justify-center text-lg">{user[0]}</div>&nbsp;
            </div>
        </div>
    )
}