import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import SearchedCountries from './components/SearchedCountries'
import SearchedCountry from './components/SearchedCountry'
import weatherService from './services/weather'
import Weather from './components/Weather'

const App = () => {
  const [ countriesData, setCountriesData ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState('')
  const [ showWeather, setShowWeather ] = useState(null)

  // Data for countries
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesData(response.data)
      })
  },[])

  // Filter countries
  const showFilteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(filteredCountries))
  const countriesToShow = filteredCountries === '' ? countriesData : showFilteredCountries

  // Show filtered countries
  const handleShowChange = (event) => {
    setFilteredCountries(event.target.value)
  }

  // Show country with show button
  const handleButtonClick = (country) => {
    setFilteredCountries(country.toLowerCase())
  }

  // Get weather for capital of filtered country
  // Added 'Buenos Aires' as default value to avoid Bad Request error at first render
  const city = countriesToShow.length === 1 
    ? countriesToShow[0].capital
    : 'Buenos Aires'

  useEffect(() => {
    weatherService
      .getWeather(city)                                                                                                                                                                                                                                                                                                                                                
      .then(response => {
        setShowWeather(response)    
    })
  }, [city])

  // Pre-filtering
  if (countriesToShow === countriesData) {
    return (
      <div>
        <Search showCountries={filteredCountries} handleShowChange={handleShowChange}/>
      </div>
    )
  // More than 10 countries filtered
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <Search showCountries={filteredCountries} handleShowChange={handleShowChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  
  // One country filtered
  } else if (countriesToShow.length === 1) {  
      return (
        <div>
          <Search showCountries={filteredCountries} handleShowChange={handleShowChange}/>
          <SearchedCountry countriesToShow={countriesToShow}/>
          <Weather 
            name={showWeather.name}
            temperature={showWeather.main.temp}
            icon={showWeather.weather[0].icon}
            wind_speed={showWeather.wind.speed}
            wind_dir={showWeather.wind.deg}
          />
          
        </div>
      )
  // Between 1 and 10 countries filtered  
  } else {
    return (
      <div>
        <Search showCountries={filteredCountries} handleShowChange={handleShowChange}/>
        <SearchedCountries countriesToShow={countriesToShow} handleButtonClick={handleButtonClick}/>
      </div>
    )
    }
}

export default App
