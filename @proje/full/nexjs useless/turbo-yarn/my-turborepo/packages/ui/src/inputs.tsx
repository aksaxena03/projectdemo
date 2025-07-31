import { ReactNode } from "react";

 interface ip{
        type:string,
        placeholder:string,
        stl:string,
        onchange?:any
    }

export default function Inputs(props:ip){
   
return(
    <input className={props.stl} type={props.type} placeholder={props.placeholder} onChange={props.onchange} />
);
}