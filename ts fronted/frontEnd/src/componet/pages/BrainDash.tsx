import { Button } from '../Button'
import PlusIcon from '../../icon/PlusIcon'
import ShareIcon from '../../icon/ShareIcon'
import Card from '../Card'
import { CreateContent } from '../CreateContent'
import { ReactElement, useState } from 'react'
import {SidePanel} from "../SidePanel"
import { useContent } from '../hooks/useContent'


function Brain() {
    interface Content{
        title:string
        Type:any
        link:string
        _id?:any
    }
    const [open, setOpen] = useState(false)
    const content= useContent()
    return (
        <div className='bg-gray-100 flex  h-full'>
                <CreateContent open={open} OnClose={() => setOpen(false)} />

            <div className="flex relative"><SidePanel/></div>
            <div className="h-full w-full ">
            <div className="w-full flex justify-end gap-3 py-3.5 px-5">
                <Button startIcon={<PlusIcon />} text='Add Content' variant='primary' onClick={() => setOpen(true)} />
                <Button startIcon={<ShareIcon />} text='Share Brain' variant='secondry' onClick={() => console.log('Share button clicked')} />
            </div>
            <div className="cards px-5 pt-8 w-fit h=1/2 flex gap-4 flex-wrap ">
                {content && content.map(({title, Type, link,_id,userId}:Content) => (
                    <Card 
                        title={title} 
                        Type={Type}
                        link={link} 
                        _id={_id}
                        userId={userId}
                    />
                ))}
            </div>
            </div>
            
        </div>
    )
}
export default Brain
