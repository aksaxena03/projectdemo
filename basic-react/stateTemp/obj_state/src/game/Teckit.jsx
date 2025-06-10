import Tickitnum from "./Teckitnum";

export default function Teckit ({teckit}){
    return(
        <div>
            {teckit.map((num,idx)=>(
            < Tickitnum num ={num} key={idx} />
            ))}
        </div>
    )
}