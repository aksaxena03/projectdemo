import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom,counterSelector } from "./Counter";

function Counter(){
    const count=useRecoilValue(counterAtom);
    return<div>
         {count}
    </div>
}

function Buttons(){
    const setCount=useSetRecoilState(counterAtom);

    function increase(){
        setCount(c=>c+2)
    }
    function decrease(){
        setCount(c=>c-1)
    }

    return(
        <>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
        </>
    )
}

function IsEven(){
    const Even=useRecoilValue(counterSelector)
    return(<div>{Even?"Even":"Odd"}</div>)
}

export default function Selector(){
    return(
        <RecoilRoot>
            <Counter/>
            <Buttons/>
            <IsEven/>
        </RecoilRoot>
    )
}