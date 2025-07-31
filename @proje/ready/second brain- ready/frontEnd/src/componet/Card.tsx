import {Youtube,Facebook,Document,X} from "./Logo/logo"
import ShareIcon from "../icon/ShareIcon";
import { DelContent } from "./DelContent";

interface CardLay {
    Type: "youtube" | "facebook" | "x" | "document";
    title:string
    // ShareLink?: ReactElement|string;
    // EmbedContent?: ReactElement|string;
    link:string;
    _id:string;
    userId?:string
}
const verify=localStorage.getItem("token")

const logos = {
    "youtube": <Youtube/>,
    "facebook": <Facebook/>,
    "x": <X/>,
    "document": <Document/>
}

const Card = (props: CardLay) => {
    // const EmbedContent=()=>{
    //     return(
            
    //     )
    // }

    // function
    return (
        <div className="flex flex-col transition delay-110 duration-50 ease-in hover:-translate-y-1 hover:scale-105 z-0.2  ">
            <div className="shadow-lg max-w-[15rem] rounded-md bg-white  ">
                <div className="flex justify-between font-semibold px-5 pt-2.5 items-center">
                    {logos[props.Type]} {props.title} 
                    <div className="flex gap-2 items-center">
                        <ShareIcon/>
                     {verify?<DelContent _id={props._id}/>:null}   
                    </div>
                </div>
                <div >
                {props.Type==="youtube" && <iframe className="w-full h-full p-4 rounded-3xl" src={props.link.replace("watch?v=","embed/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}

                {props.Type==="x" && <div className="w-1/6 h-1/2 pt-4 " ><blockquote className="twitter-tweet rounded-3xl" data-media-max-width="560">
                    <a href={props.link.replace("x","twitter")}></a>
                </blockquote><script async src="https://platform.twitter.com/widgets.js"></script></div>}
                </div>
            </div>
        </div>

        
    )
}

export default Card;