import { Youtube, X, Facebook, Document } from './Logo/logo'
import { Brain as BrainLogo } from "./Logo/Brain"
import { Button } from './Button'
export function SidePanel() {
        return (
            <div className=" bg-white top-0 my-0 start-0 shadow-xl flex flex-col ">
                <div className=" ps-2.5 pt-1.5">
                    <Button variant="none" startIcon={<BrainLogo />} text='Second Brain' className='flex p-4 text-xl text-blue-500 mb-8' />
                    <div className="flex flex-col w-[75%] md:w-[100%] gap-2.5 size-3 ml-3">
                        <Button variant="none" startIcon={<X />} text='Twittes' className='shadow-sm transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110  opacity-65 w-[13rem] px-3.5 mr-5 hover:opacity-100'/>
                        <Button variant="none" startIcon={<Youtube />} text='Videos' className='shadow-sm transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110  opacity-65 w-[13rem] px-3.5 mr-5hover:opacity-100' />
                        <Button variant="none" startIcon={<Facebook />} text='Posts' className='shadow-sm transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110  opacity-65 w-[13rem] px-3.5 mr-5hover:opacity-100' />
                        <Button variant="none" startIcon={<Document/>} text='Document' className='shadow-sm transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110  opacity-65 w-[13rem] px-3.5 mr-5 hover:opacity-100'/>
                    </div>

                </div>
            </div>

        )
}