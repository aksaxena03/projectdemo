import Inputs from "../componet/Input"
export function Signin(){
    return(
        <div className="">
            <Inputs label="Username"  placeholder="username" type="string"/>
            <Inputs label="Password" placeholder="Password" type="Password"></Inputs>
            <button type="submit">Signin</button>
        </div>
    )
}