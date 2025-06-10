import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Weathercard from './Weathercard';
export default function Weatherapp() {
    let [city, setCity] = useState("");
    let [weatherData, setWeatherData] = useState(null);
    let [err,setErr]=useState("")
    // const api = import.meta.env.REACT_APP_WEATHERAPI;
    // const key = import.meta.env.REACT_APP_KEY;
    const api = "https://api.weatherapi.com/v1/current.json?";
    const key = "1691fb0409b94847a9d72839251104";
    let fetchData = async () => {
        try {
            let jsonData = await fetch(`${api}key=${key}&q=${city}`)
            let resposData = await jsonData.json()
            if (resposData.error) {
                console.error(resposData.error.message);
                setErr(`${city},${resposData.error.message} `)
                
            }
            let result = {
                city: city,
                temp: resposData.current.temp_c,
                windSpeed: resposData.current.wind_kph,
                humidty: resposData.current.humidity,
                weather: resposData.current.condition.text,
                feelsLike: resposData.current.feelslike_c,
                country: resposData.location.country,
                
            }
            setErr("")
            setWeatherData(result);
            console.log(resposData)
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // setErr("Error fetching weather data:", error)
        }
    }
    let changeHandler = (e) => {
        let val = e.target.value;
        setCity(val);
    }
    
    let submitHandler = (e) => {
        e.preventDefault();
        
        fetchData();
        setCity("")
    }
    return (
        <>
            <div style={{ textAlign: "center"}}>
                <h1>Weather app</h1>
                <form action="" onSubmit={submitHandler}>

                    < TextField id="city" label="city" variant="outlined" size="small" name="city" value={city} onChange={changeHandler} />
                    <br /><br />
                    <Button type="Submit" variant="outlined">Search</Button>
                </form>
                <br />
                {err ? <h2 style={{color:"red"}}>{err}</h2> : weatherData && <Weathercard info={weatherData} />}
            </div>
        </>
    );
}