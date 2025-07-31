import Clock_by_useRef from "./HOOKS/Clock_by_useRef";
import Routers from "./routers";
import Count from "./Count";
import CustomHooks from "./HOOKS/CustomHooks";
import Hooks from "./HOOKS/Hooks";
import Couter from "./HOOKS/Couter";
import { RecoilRoot } from "recoil";
import Memocount from "./HOOKS/Memocount";
import './App.css'
import Selector from "./HOOKS/Selector";



export default function App(){
  return(
    <div>
      <Selector/>
    {/* <Memocount /> */}
    {/* <Count/> */}
    {/* <CustomHooks/> */}
    
        {/* <RecoilRoot>            
        <Couter />                              //atom Recoil
        </RecoilRoot> */}
    
    {/* <Hooks/> */}
    {/* <Clock_by_useRef></Clock_by_useRef>
    <Routers/> */}  
    </div>
  )
}