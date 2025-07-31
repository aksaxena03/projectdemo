import axios from "axios"
import Card from "./Card"
import { SidePanel } from "./SidePanel"
import { useEffect, useState } from "react"
import { Backend_url } from "../../config"
import { useNavigate, useParams } from "react-router-dom"
function SharedBrain() {
    let navigate=useNavigate()
    let params = useParams()
    const [content, setContent] = useState<Content | null>()

    interface Content{
        title:string
        Type:any
        link:string
        _id?:any
        [key: string]: any;

    }
    const handelContent = async () => {
      
       if(params) {  console.log("at handelContent" +params.sharedlink)
        const response = await axios.get(`${Backend_url}/api/v1/content/${params.sharedlink}`)
        console.log(response)
        setContent(response.data.content)}else{navigate('/signin')}
    }
        console.log(content)

    console.log("parmas not found"+content +params.sharedlink )
    useEffect(() => {
        handelContent()
    }, [params])

    return (
        <div className='bg-gray-100 flex  h-full'>
                    {content?
            <div className="">
                <div className="flex fixed w-[10%] sm:w-[20%] h-[100%] z-1 border-b-sm border-black"><SidePanel/></div>
                        <div className="h-full w-[60%] lg:w-[80%] md:w-[70%] flex flex-col items-end absolute right-10">
                        <div className="cards pt-8 end-0 flex gap-2 md:gap-4 flex-wrap justify-end z-0.2  ">
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
            :"link not found"}
        </div>
    )
}
export default SharedBrain
