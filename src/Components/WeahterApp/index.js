import { useState , useEffect } from "react";
import React from "react";
import './weather.css'
import search from '../Assets/search.png'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import humidity from '../Assets/humidity.png'


const WeatherApp=()=>{
    const [name,setName]=useState('')
    const [api, setApi]=useState()

      
      
    
    const handleClick=()=>{
    if (name !=="") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4a02c9599fba7d5b4f0f5216fb886639&units=metric`)
            .then(res => res.json())
            .then(res => {
                let images=''
                if(res.weather[0].main =='Clouds'){
                    images=<img src={cloud} />
                }else if(res.weather[0].main =='clear'){
                    images=<img src={clear} />
                }  else if(res.weather[0].main =='Rain'){
                    images=<img src={rain} />
                } else if(res.weather[0].main =='Drizzle'){
                    images=<img src={drizzle} />
                }
                else if(res.weather[0].main =='snow'){
                    images=<img src={snow} />
                }else{
                    images=<img src={cloud} />
                }
                console.log('res:', res);
                        setApi({ celcius: res.main.temp, name:res.name, humidity:res.main.humidity, speed:res.wind.speed });
        })
    }
    }

    return(
        <div className="container">
            <div className="weather">
                <div className="search">
                <input type="text" placeholder="Enter City Name" onChange={e=> setName(e.target.value)}/>
                <button onClick={handleClick}><img src={search}/></button>
            </div>
            <div className="winfo">
                <img src={cloud} />
                <h1>{Math.round(api && api.celcius)}°c</h1>
                <h2>{api && api.name}</h2>
                <div className="detail">
                    <div className="col">
                        <img src={humidity}/>
                        <div className="humidity">
                            <p>{Math.round( api && api.humidity)} %</p>
                            <p>Humidity</p>  
                        </div>
                        
                    </div>
                    <div className="col" ></div>
                    <img style={{width:'45px', marginright:'10px'}} src={wind}/>
                        <div className="wind">
                            <p>{Math.round(api && api.speed)} km/h</p>
                            <p>Wind</p>
                        </div>
                     
                </div>
            </div>
            </div>
        </div>
        )
}


export default WeatherApp