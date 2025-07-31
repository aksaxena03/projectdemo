import { useState,useEffect } from "react";
export default function Joke(){
    const JokeUrl='https://official-joke-api.appspot.com/random_joke'
    const [joke, setJoke] = useState({})  //({ setup: '', punchline: '' })
    let joking=async()=>{
        let respons= await fetch(JokeUrl);
        let jsonRes= await respons.json();
        setJoke({setup:jsonRes.setup,punchline:jsonRes.punchline});
        
    }
    useEffect(() => {         //showing error in console for direct use joking() ,beside use async funtion or async callbacks
        const fetchJoke = async () => {
            let respons = await fetch(JokeUrl);
            let jsonRes = await respons.json();
            setJoke({setup: jsonRes.setup, punchline: jsonRes.punchline});
        };
        fetchJoke();
    }, [])

    return(
        <>
        <h1>{joke.setup}</h1>
        <h2>{joke.punchline}</h2>
        <button onClick={joking}>new</button>
        </>
    )
}