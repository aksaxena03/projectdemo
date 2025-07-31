import axios from "axios";
import Button from "../Component/Button";
import InputBox from "../Component/InputBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Transfer(){
const navi=useNavigate();

 useEffect (() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navi("/Signin"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

const [searchparams] = useSearchParams();
// const name = searchparams.get("name") || "";
const username = searchparams.get("username") || "";
const email = searchparams.get("email") || "";
const to = searchparams.get("userid") || "";
const [amount,setAmount]=useState("")


    return(
        <div className="h-screen w-screen flex items-center justify-center backdrop-blur-lg">
            
            <div className="rounded-3xl shadow-2xl shadow-black border-black border-t-2 w-1/4 h-3/7 flex flex-col p-6 ">
               <div className="flex items-center mb-3.5">
                    <div className="bg-green-400  text-white font-semibold rounded-full h-10 w-10   flex items-center justify-center text-lg">
                        {username ? username[0].toUpperCase() + (username[1] || "") : ""}
                    </div>&nbsp;
                    <div className="">
                        <div className="m-auto font-semibold">{username}</div>
                        <span className="text-gray-400"> {email}</span>
                    </div>
                </div>
                <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    setAmount(e.target.value)
                }} type="number" placeholder="Amount"></InputBox>
                {/* <a href="" className="text-right pb-1">forgot Password ?</a> */}
                <Button
                    onClick={async () => {
                        
                        interface TransferResponse {
                            balance: number;
                        }
                        await axios.post<TransferResponse>(
                            'http://localhost:3001/api/v1/account/transfer',
                            { amount, to },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }
                        );
                        alert(`Transfer successfull,
                            `);
                        navi('/Dashboard');
                    }}
                    text="Send"
                    style="mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-m py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                ></Button>

            </div>
            
        </div>
    )
} 