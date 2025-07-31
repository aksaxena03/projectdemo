export default function api({params}:any){
    const resp = params.blog

    
    return(
        
        <div className="">
            hello <br />
            blog:
            {JSON.stringify(params.blog)}
            <br />
            bye
            </div>

    )
}