import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Search = ({search, onChange}) => {
  return (
    <>
      Country : <input value={search} onChange={onChange}/>
    </>
  )
}

const Result = ({countries, search, showButtonClicked, onClick}) => {

  if (search === '') {
    return (
      <p>Please enter a country's name</p>
    )
  }
  let selectedCountries = [];
  // Handle with the Show button here
  if (showButtonClicked.clicked) {
    console.log("clicked :", showButtonClicked.clicked, "on what ?", showButtonClicked.countryName)
    selectedCountries = countries
    .filter((country) => country.name === showButtonClicked.countryName)
  } else {
    selectedCountries = countries
    .filter((country) => country.name.toLowerCase().includes(search))
  }

  console.log(selectedCountries.length)

  if (selectedCountries.length > 10) {
    return (
      <p>Too many results, please be more specific.</p>
    )
  } else {
    if (selectedCountries.length > 1) {
      return (
        <ul>
          {countries
          .filter((country) => country.name.toLowerCase().includes(search))
          .map((country) => 
            <li key={country.name}>
              {country.name}
              <button onClick={(name) => onClick(country.name)}>Show</button>
            </li>)}
        </ul>
      )
    } else if (selectedCountries.length === 1) {
      return (
        <CountryData country={selectedCountries[0]}/> // cause countries.length must be 1
      )
    } else {
      return (
        <p>No results, please try again</p>
      )
    }
  } 
}

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map((language) => <li key={language.name}>{language.name}</li>)}
    </ul>
  )
}

const Weather = ({city}) => {
  const [ weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled (weather data)')
        const weatherData = response.data
        setWeather(weatherData)
      })
  }, [])

  // Some issues to go further : can acces to "weather.main", 
  //but not "weather.main.temp" and don't understand why
  console.log(weather.weather)
  //const weatherTemp = Math.round(weather.main.temp - 273) + "°C";
  //const weatherWind = (Math.round(weather.wind.speed * 3.6)) + " km/h.";

  return (
    <>
      <h4>Weather in {city}</h4>
      <p>Temperatur : </p>
      <img alt="weather_img"/>
      <p> Wind speed : </p>
    </>
  )
}

const CountryData = ({country}) => {

  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital : {country.capital}</p>
      <p>Population : {country.population}</p>

      <h4>Languages</h4>
      <Languages languages={country.languages}/>

      <img src={country.flag} alt="flag" width="100px"/>

      <Weather city={country.capital} />

    </div>
  )
}

const App = () => {

  // ---------------- Variables --------------

  const [ countries, setCountries ] = useState([]) 
  const [ search, setSearch] = useState('')
  const [ showButtonClicked, setShowButtonClicked] = useState(
    { clicked:false, countryName : ''}
    )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled (country data)')
        setCountries(response.data)
      })
  }, [])

  // ---------------- Methods ----------------

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

    // Reinitialise button when new search
    const newObject = {
      clicked: false, countryName : ''
    }
    setShowButtonClicked(newObject)
  }

  const handleShowClick = (name) => {
    const newObject = {
      clicked: true, countryName : name
    }
    setShowButtonClicked(newObject)
  }

  // ---------------- Render ----------------

  //console.log("Search variable : ", search,
  //"First country : ", countries[0])

  return (
    <>
      <h2>Countries Data</h2>

      <Search 
        search={search}
        onChange={handleSearchChange}
      />

      <Result 
        countries={countries}
        search={search}
        onClick={handleShowClick}
        showButtonClicked={showButtonClicked}
      />
    </>
  )
}

export default App
