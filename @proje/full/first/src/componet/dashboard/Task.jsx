export default function Task(){
    function Schedule({time,mode,event}){
        return(
        <>
        <div className="row row-span-1 grid  grid-cols-3 divide-x divide-blue-600 mb-.5 shadow-sm rounded p-0.5  border-fuchsia-50 hover:border-cyan-900 border-1">
            <div className="time col-span-1">{time} <br /> {time}</div>
            <div className="task col-span-2">{mode}<br />{event}</div>
        </div>
        </>)
    }
    return(
    <>  <div className="wish">Good morning </div>
        <div className="boxTask max-w rounded overflow-hidden shadow-lg m-2.5 bg-fuchsia-50 px-3.5">
            <div className="scheduleTime">Schedule</div>
            <div className="task grid grid-rows-4">
                <Schedule time={"12:45 AM"} mode={"online"} event={'press confress'}/>
                <Schedule time={"12:45 AM"} mode={"online"} event={'press confrenss'}/>
                <Schedule time={"12:45 AM"} mode={"online"} event={'press confrenss'}/>
                <Schedule time={"12:45 AM"} mode={"online"} event={'press confrenss'}/>

            </div>
        </div>
    </>)
}