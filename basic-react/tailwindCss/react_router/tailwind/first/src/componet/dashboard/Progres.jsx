import Card from "./Card";
import Feature from "./Feature";
import Task from "./Task";

export default function Progres(){
    return(
        <div className="pro flex flex-col">
            <div className="degain w-full h-35 bg-fuchsia-950"></div>
            <div className="hero flex flex-col md:flex-row  m-auto md:m-0  flex-1 ">
                <div className="card flex-1/4 mt-[-2.8rem]"><Card/></div>
                <div className="task flex-2/4"><Task/></div>
                <div className="feature flex-1/4"> <Feature/></div>
                
            </div>
        </div>
    )
}