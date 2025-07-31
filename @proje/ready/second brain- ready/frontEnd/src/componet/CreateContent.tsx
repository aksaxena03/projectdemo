import CloseIcon from "../icon/CloseIcon"
import {Input} from "./Input"
import {Button} from "./Button"
import { useRef, useState } from "react"
import axios from "axios"
import { Backend_url } from "../../config"
import { useNavigate } from "react-router-dom"
type CreateContentProps = {
    open: boolean;
    OnClose: () => void;
  };
export function CreateContent({open, OnClose}: CreateContentProps){
    const titleRef=useRef<HTMLInputElement>(null)
    const linkRef=useRef<HTMLInputElement>(null)
    const [type,SetType]=useState<string>()
    const navigate=useNavigate()
    async function create(){ 
        const title=titleRef.current?.value
        const link=linkRef.current?.value
        const Type=type
        console.log(title,link,Type)
        if(title!=""||link!=""){
            await axios.post(`${Backend_url}/api/v1/content`,{
                title,link,Type
            },{
                headers:{"Authorization":localStorage.getItem("token")}
            });
            {title!=""&&link!=""? navigate("/Dash")  :alert("invalid data")}

        }
    }
    return(
       <div className="">

         {open && <div className="size-full fixed flex justify-center items-center backdrop-blur-sm ">
            <div className="flex flex-col w-1/4 h-2/5 bg-white rounded-xl shadow-5xl border-black ">
                   <div className="flex justify-end px-2.5 py-3 w-full items-start ">
                        <button onClick={OnClose}><CloseIcon/></button>
                    </div> 
                    <div className="px-4 pt-4 flex flex-col gap-3.5">
                        <Input reference={titleRef} use="title" />
                        <Input reference={linkRef} use="link"/>

                        <div className="w-full ">
                           <h2>Type:</h2> 
                        <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'youtube', label: 'Youtube' },
                                        { id: 'facebook', label: 'Facebook' },
                                        { id: 'document', label: 'Document' },
                                        { id: 'x', label: 'X' }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="Type"
                                                id={item.id}
                                                value={item.id}
                                                onChange={(e) => SetType(e.target.value)}
                                                className="form-radio"
                                            />
                                            <label htmlFor={item.id}>{item.label}</label>
                                        </div>
                                    ))}
                                </div>
                        <Button onClick={create} variant="primary" text="Save" className="w-full mt-7 flex justify-center"/>

                        </div>
                    </div>
            </div>
        </div>}
       </div>
    )
}