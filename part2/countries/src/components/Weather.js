import React from 'react'

const Weather = ({name, temperature, icon, wind_speed, wind_dir}) => {

    return (
        <div>
            <h2>Weather in {name}</h2>
            <p>Current Temperature: {Math.round(temperature) / 10} Celsius</p>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} width="150px" alt={`Weather icon from ${name}`}></img>
            <p>Wind: {wind_speed} km/h Direction: {wind_dir}</p>
        </div>
    )
}

export default Weather