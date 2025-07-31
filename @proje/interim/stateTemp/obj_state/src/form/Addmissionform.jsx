import { useState } from "react"

export default function Addmis(){
    let[addm,setAddm]=useState({
        fullname:'',
        phone:'',
        mail:'',
        parentname:'',
    })
    let data=(event)=>{
        let inputname=event.target.name
        let inputvalue=event.target.value
        // console.log(inputvalue)s
        setAddm((curr)=>{
            curr[inputname]=inputvalue
            
            return{ ...curr}
            // return(...curr,[inputname]:inputvalue)
        })
        // console.log(addm)
    }

    return(
        <>
            <form action="" onSubmit={(event)=>{
                event.preventDefault();
                console.log(addm)
                setAddm({ fullname:'',
                    phone:'',
                    mail:'',
                    parentname:'',})
            }}>
                <label htmlFor="fullname">Full name</label>&nbsp;
                <input type="text" id="fullname" name="fullname" value={addm.fullname} onChange={data} /> &nbsp; &nbsp; 
                <br /><br />
                <label htmlFor="parentname">Parent name</label>&nbsp;
                <input type="text" id="parentname" name="parentname" value={addm.parentname} onChange={data}/> &nbsp; &nbsp;
                <br /><br />
                
                <label htmlFor="phone">phone no</label>&nbsp;
                <input type="number" id="phone" name="phone" value={addm.phone} onChange={data}/> &nbsp; &nbsp;
                <br /><br />

                <label htmlFor="mail">mail address</label>&nbsp;
                <input type="text" id="mail" name="mail" value={addm.mail} onChange={data}/> &nbsp; &nbsp;
                 
                 <button>submit</button>
            </form>
        </>
    )
}