import { useEffect, useState } from "react";
import Appbar from "../Component/Appbar";
import axios from "axios";
import InputBox from "../Component/InputBox";
import Card from "../Component/card";
import { useNavigate } from "react-router-dom";

// Define a User type if needed, or remove this line entirely
// type User = { email: string; phone_number: string };

type Balance = {
    balance?: string;
    user?: string;
};

export default function Dashboard(){
const navi=useNavigate();

 useEffect (() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navi("/Signin"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

const [bal, setBal]=useState<Balance>({})
const [users, setUsers] = useState<any[]>();
const [filter, setFilter] = useState("00");
 useEffect(() => {
            axios.get('http://localhost:3001/api/v1/account/balance', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        .then(response => {
            const data = response.data as { balance: string };
            // console.log(data)
            setBal(data);
        });
        // console.log(bal);
    }, []);
useEffect(() => {
    axios.get("http://localhost:3001/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            const data = response.data as { users: any[] };
            setUsers(data.users);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
}, [filter]);
// console.log( users);
    return(
        <div className="">
            <Appbar user={bal.user ?? ""} ></Appbar>
            <div className="">Your Balance {Math.floor(parseInt(bal.balance ?? "0"))}</div>
            <div className="">
                {/* <input type="search" /> */}
                <InputBox type="search" placeholder="username" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFilter(e.target.value)}/>
            </div>
            <div className="">
                
                {(users ?? []).map((user: any, idx: number) => (
                    <div key={idx}>
                {/* {console.log(users.email)} */}
                        <Card name={user.name} email={user.email} phone={user.phone_number} userid={user._id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}