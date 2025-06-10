import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {

    let [item,setItem]=useState([])
    let [newtodos,setNewtodos]=useState("")
    
    let updatetolist =(event)=>{
        setNewtodos(event.target.value)   
    }
    let addtolist=()=>{
        setItem((prvitem)=>{
            return [...prvitem, {task:newtodos,id:uuidv4(),isdone:false}]
        })
        setNewtodos("")
    }
    let del=(id)=>{
        setItem((prevItems)=>{
            return prevItems.filter((item)=>{item.id!==id})

        }
        )}
    
    let allupper=()=>{
        let em = item.map((todo)=>({
            ...todo,
            task: todo.task.toUpperCase(),
            isdone:true
        }));
        setItem(em);
    }
    let oneupper=(id)=>{
      setItem((prvitem)=>
        prvitem.map(
            (todo)=>{
                if(todo.id===id){
                    return {
                        ...todo,
                        task:todo.task.toUpperCase(),
                        isdone:true
                        
                    };
                } else {
                    return todo;
                }
            }
        )
      );
    }
    let completed=(e)=>{
        // setItem((prvitem)=>{
        //     return prvitem.map((item)=>{if(item.id==id){item.isdone=true}})
        // })

        e.target.parentElement.style.textDecoration = e.target.checked ? 'line-through' : 'none'
        
    }
    


    return (
        <>
        <h2>Todo list</h2>
        <input type="text" placeholder="enter your task" value={newtodos} onChange={updatetolist} /><br /> 
        <button onClick={addtolist} >add</button>
        <br /><br /><br />
        <hr />
        <h3>To do Task</h3>
        <ul>
            {item.map((todo)=>(
               <li key={todo.id}><span 
               style={todo.isdone?{textDecorationLine:"line-through"}:{}}>{todo.task}
               <button onClick={()=>del(todo.id)}>del</button>
               <input type="checkbox" name="done" checked={todo.isdone} 
               onChange={(e)=>completed(e)}/>
               <button onClick={()=>oneupper(todo.id)}>uppercase</button></span> </li>
            ))}
        </ul>
        {/* <input type="checkbox" name="done" onChange={completed}/> */}
        <button onClick={allupper}>ALLuppercase</button>
        </>
    )
}