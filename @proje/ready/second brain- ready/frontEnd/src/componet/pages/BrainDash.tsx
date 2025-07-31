import { Button } from '../Button'
import PlusIcon from '../../icon/PlusIcon'
import ShareIcon from '../../icon/ShareIcon'
import Card from '../Card'
import { CreateContent } from '../CreateContent'
import {useEffect, useState } from 'react'
import {SidePanel} from "../SidePanel"
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { Backend_url } from '../../../config'


function Brain() {
    interface Content{
        title:string
        Type:any
        link:string
        _id?:any
    }
    const [open, setOpen] = useState(false)
    const {content,refresh}= useContent()
   
    useEffect(() => {
    refresh();
  }, [open, refresh])

  const ShareHandler=async()=>{
                console.log("ShareHandler")
            const response = await axios.post(`${Backend_url}/api/v1/content/share`,{
                share:true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            console.log(response)
            navigator.clipboard.writeText(`http://localhost:5173${response.data.hash}`);

            const shareUrl = `http://localhost:5173${response.data.hash}`;
            alert(shareUrl);
        
  }

    return (
        <div className='bg-gray-100 h-[100%] w-[100%] flex'>
                <CreateContent open={open} OnClose={() => setOpen(false)} />
            <div className="flex fixed w-[10%]md:w-[20%] h-[100%] z-1 border-b-sm border-black"><SidePanel/></div>
            <div className="h-full w-[60%] lg:w-[80%] md:w-[70%] flex flex-col items-end absolute right-10">
            <div className="flex flex-col sm:flex-row fixed justify-end pl-[75%] sm:pl-[0%] gap-3 py-3.5 z-0.9 w-full bg-white">
                <Button startIcon={<PlusIcon />} text='Add Content' variant='primary' onClick={() => setOpen(true)} />
                {/* <Button startIcon={<ShareIcon />} text='Share Brain' variant='secondry' onClick={() => console.log('Share button clicked')} /> */}
                 <Button onClick={ShareHandler} variant="secondry" text="Share brain" startIcon={<ShareIcon />}></Button>
            
            </div>
            <div className="cards pt-8 end-0 flex gap-2 md:gap-4 mt-30 sm:mt-15 flex-wrap justify-end z-0.2  ">
                {content && content.map(({title, Type, link, _id}:Content) => (
                    <Card 
                        title={title} 
                        Type={Type}
                        link={link} 
                        _id={_id}
                    />
                ))}
            </div>
            </div>
            
        </div>
    )
}
export default Brain
