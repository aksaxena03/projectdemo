import { ReactElement } from 'react';

interface Btn{
    variant:"primary"|"secondry";
    text:string;
    startIcon:ReactElement;
}
//purple:200:#d9ddee
//purple:500:#9452db
//purple:600:#7164c0

//grey:100:"#eeeeef"
//grey:200:"#e6e9ed"
const BtnStyle={
    "primary":"text-white bg-purple-600"
    ,"secondry":"text-purple-400 bg-purple-200"
}

export function Button(props:Btn){
    return (
        <button className={`${BtnStyle[props.variant]} px-1 py-2 rounded`}>
            {props.startIcon}
            <div className="pl-2">{props.text}</div>
            
        </button>
    )
}