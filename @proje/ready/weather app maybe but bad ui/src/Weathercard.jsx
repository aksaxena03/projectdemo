import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { color } from '@mui/system';
export default function Weathercard({ info }) {
    const rainURL = 'https://images.unsplash.com/photo-1517964101322-a4cfaaf56e5b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    const hotURL = 'https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdHxlbnwwfHwwfHx8MA%3D%3D'
    const coldURL = 'https://images.unsplash.com/photo-1516047487059-fd288d84e8cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbGR8ZW58MHx8MHx8fDA%3D'

    return (
        <>

            

            <Card sx={{ maxWidth: 600, margin: 'auto'}}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={info.humidty > 80 ? rainURL : info.temp > 30 ? hotURL :  coldURL }
                    // image="https://plus.unsplash.com/premium_photo-1700124162812-1d5d29087b81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    
                />
                <CardContent >

                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.8rem" }}>
                    {info.humidty > 80 ? <UmbrellaIcon/> : info.temp > 30 ? <DeviceThermostatIcon size="normal"/> : <AcUnitIcon size="normal"/>}&nbsp;  {info.city }, {String(info.country).toLowerCase() !== String(info.city).toLowerCase() ? info.country : ""}
                    </Typography>
                    <Typography variant="body1"sx={{ fontSize: "1.2rem" }}>
                       
                        Temperature: {info.temp}°C <br />  
                        Wind Speed: {info.windSpeed} km/h <br />
                        Humidity: {info.humidty}% <br />
                        Weather: {info.weather} <br />
                        Feels Like: {info.feelsLike}°C
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
}