import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import SearchedCountries from './components/SearchedCountries'
import SearchedCountry from './components/SearchedCountry'
import weatherService from './services/weather'


const App = () => {
  const [ countriesData, setCountriesData ] = useState([])
  const [ showCountries, setShowCountries ] = useState('')
                                                                                                                                                    
  // DATA FOR COUNTRIES
  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountriesData(response.data)
      })
  },[])

  // console.log('countries', countriesData.length)

  // FILTER COUNTRIES
  const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(showCountries))
  const countriesToShow = showCountries === '' ? countriesData : filteredCountries

  // SHOW COUNTRIES
  const handleShowChange = (event) => {
    setShowCountries(event.target.value)
  }

  // SHOW BUTTON HANDLE EVENT
  const handleButtonClick = (country) => {
    setShowCountries(country.toLowerCase())
  }

  // WEATHER
  const [ showWeather, setShowWeather ] = useState([])

  useEffect(() => {
    weatherService
      .getWeather()
      .then(weather => {
          setShowWeather(weather)
      })
  },[])

   
  if (countriesToShow === countriesData) {
    return (
      <div>
        <Search showCountries={showCountries} handleShowChange={handleShowChange}/>
      </div>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <Search showCountries={showCountries} handleShowChange={handleShowChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        <Search showCountries={showCountries} handleShowChange={handleShowChange}/>
        <SearchedCountry countriesToShow={countriesToShow}/>
        <h2>Weather in {showWeather.location.name}</h2>
        <p>Current Temperature: {showWeather.current.temperature} Celsius</p>
        <img src={showWeather.current.weather_icons} width="150px" alt={`Icon of ${showWeather.location.name}`}></img>
        <p>Wind: {showWeather.current.wind_speed} km/h Direction: {showWeather.current.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <div>
        <Search showCountries={showCountries} handleShowChange={handleShowChange}/>
        <SearchedCountries countriesToShow={countriesToShow} handleButtonClick={handleButtonClick}/>
      </div>
    )
    }
}

export default App
