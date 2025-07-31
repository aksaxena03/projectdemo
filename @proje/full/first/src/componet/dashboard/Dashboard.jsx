import { useState } from 'react'
import Leftpanal from './Leftpanal'
import Progres from './Progres'
export default function Dashboard() {
    const [open,setOpen]=useState('true')

    function Btn(){
        setOpen(!open)
    }

    
    return (
        <>
            
            <div className="main flex divide-x-2 h-screen divide-gray-400 ">
            <button onClick={Btn} className='text-4xl absolute z-50 ' >
                            {open ? '≡' : '←'}
                        </button>
                <div className={`leftPanel absolute transition-all  bg-amber-200 z-40ease-in duration-100 w-1/5 ${open?'hidden':'block  bg-amber-200'} max-sm:w-3/5 max-md:w-2/5  md:${open?'ml-[-17.5rem]':'m-0'} h-full `}>
                    <Leftpanal hd={open}/>
                </div>
                <div className="progress bg-sky-300 flex-1 md:w-4/5"><Progres /></div>
            </div>
            {/* hard to add animation in grid */}
            {/* <div className="main grid grid-cols-5 divide-x-2 h-screen divide-gray-400 ">
                    <div className="leftPanel transform transition-transform duration-500 ease-in hidden md:block md:col-span-1 bg-amber-200"><Leftpanal/></div>
                    <div className="progress col-span-5 md:col-span-4 bg-sky-300"><Progres/></div>
                </div> */}
        </>
    )
}