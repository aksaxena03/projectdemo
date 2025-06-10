import { ReactElement } from "react";

interface prop{
    type:string,
    label:string,
    placeholder:string,
    name:string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Inputs({label, type, name,placeholder ,onChange }: prop){
    return(
        <div className="">
            <label htmlFor="">{label}</label>
        <input 
            type={type}
            onChange={onChange}
            
            placeholder={placeholder}
        />
        </div>
    );
}