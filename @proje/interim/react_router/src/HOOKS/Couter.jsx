import { counterAtom } from './Counter.js'                  //intialize the counteratom in address
import { useSetRecoilState, useRecoilValue } from "recoil" 


export default function Couter() {
    
    function ConVal() {
    const count = useRecoilValue(counterAtom);              //useRecoilValue is used to intialize the count

        return <span>{count}</span>
    }
    function Inc() {
    const setCount = useSetRecoilState(counterAtom);            //useSetRecoilState is used to set count value

        return <div><button onClick={() => setCount(c => c + 1)}>Inc</button></div>
    }
    function Dec() {
    const setCount = useSetRecoilState(counterAtom);

        return <div><button onClick={() => setCount(c => c - 1)}>Dec</button></div>
    }

    return (
        <>
            <ConVal />
            <Inc />
            <Dec />
        </>
    )
}

