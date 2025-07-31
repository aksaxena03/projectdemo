import { counterAtom } from './Counter.js'
import { useSetRecoilState, RecoilRoot, useRecoilValue } from "recoil"


export default function Contextapi() {
    const count = useRecoilValue(counterAtom);
    const setCount = useSetRecoilState(counterAtom);
    
    function ConVal() {
        return <span>{count}</span>
    }
    function Inc() {
        return <div><button onClick={() => setCount(c => c + 1)}>Inc</button></div>
    }
    function Dec() {
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

