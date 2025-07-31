import Forms from "./Forms";

export default function We(){
    return(
    <>
    <div className="Screen h-screen bg-sky-500 flex flex-col items-center">
      <div className="logo m-20 font-semibold text-4xl"><span className='text-white'>Webinar</span><span className='text-sky=200'>.ogg</span></div>
      <div className="main">
        <h2 className='font-bold text-4xl text-white'>verify Your age</h2>
        <p className='text-sky-400 font-bold p-1'>Please confrom your age.</p>
        
      </div>
      
    <Forms/>
    </div>
    </>)
}