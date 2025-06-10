import { ReactElement } from 'react';

interface Btn {
    variant: "primary" | "secondry" | "none";
    text?: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    className?: string
}
//purple:200:#d9ddee
//purple:500:#9452db
//purple:600:#7164c0

//grey:100:"#eeeeef"
//grey:200:"#e6e9ed"
const BtnStyle = {
    "primary": "text-white bg-purple-600"
    , "secondry": "text-purple-400 bg-purple-500/10",
    "none": ""

}

export function Button(props: Btn) {

    return (
        <button
            type='button'
            onClick={props.onClick}
            className={`${BtnStyle[props.variant]} ${props.className} px-3 py-1 rounded-md font-semibold `}>
            <div className='flex items-center'>{props.startIcon}
                <div className="pl-1">{props.text}</div></div>
        </button>
    )
}