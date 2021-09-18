import React, { useState, useEffect } from "react";
import axios from 'axios'



const Flag = ({ url, country }) => {
    return (<img src={url} alt={'flag of ', country} width='100'></img>)
}

const Country = ({ country }) => {

    const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    return (<div>
        <h2>{country.name}</h2>
        <p>capital {country.capital} <br />
            population {country.population}
        </p>
        <h3>languages</h3>
        <ul>{languages}</ul>
        <Flag url={country.flag} country={country.name} />
        <Weather selectedCountry={country} />
    </div>)
}

const Weather = ({ selectedCountry }) => {
    const [weather, setWeather] = useState({})
    const getWeather = () => {
        const capital = selectedCountry.capital
        const api_key = process.env.REACT_APP_API_KEY
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
        axios.get(url).then(resp => {
            setWeather(resp.data)
            console.log('GetWeather promise fulfilled.')
        })
    }
    useEffect(getWeather, [])

    if (Object.keys(weather).length === 0/* checking if weather is an empty object */) {
        console.log('weather is empty')
        return (<div>no weather info</div>)
    }
    else {
        console.log('weather is not an empty object')
        return (<div>
            <h2>Weather in {selectedCountry.capital}</h2>
            <p>temperature: {weather.current.temperature}</p>
            <img src={weather.current.weather_icons} alt='weather icon' />
            <p>wind: {weather.current.wind_speed}</p>
            <p>wind direction: {weather.current.wind_dir}</p>
        </div>)
    }
}

const Content = ({ selectedCountry, countries, setSelectedCountry, filterString, }) => {
    const filteredCountries = countries.filter(country => country.name.includes(filterString))
    const numberOfCountries = filteredCountries.length

    if (Object.keys(selectedCountry).length > 0 /* country selected */) {
        return (<Country country={selectedCountry} />)
    }
    else { // no country selected
        if (numberOfCountries === 1) { //return the country
            return <Country country={filteredCountries[0]} />
        }
        else if (filterString === '') return <div></div> //return no result
        else if (numberOfCountries <= 10) { //return list of 10 countries
            const countriesToShow = filteredCountries.map(c =>
                <div key={c.name}>
                    <br />
                    {c.name} <button onClick={() => { setSelectedCountry(c) }}>show</button>
                </div>)
            return (<div>
                <ul>{countriesToShow}</ul>
            </div>)
        }
        else return (<div>too many result</div>)
    }
}

/* const CountriesToShow = ({ filteredCountries }) => {
    const countriesToShow = filteredCountries.map(c => <div key={c.name}>
        <p>{c.name}</p>
        <button onClick={handleButtonClick}>show</button>
    </div>)
    return (<div>
        <ul>{countriesToShow}</ul>
    </div>)
} */


const App = () => {

    const [filterString, setFilterString] = useState('')
    const [countries, setResponse] = useState([])
    const [selectedCountry, setSelectedCountry] = useState({})


    const getCountriesEffect = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(resp => {
            setResponse(resp.data)
            console.log('getCountriesHook promise fulfilled')
        })
    }
    useEffect(getCountriesEffect, [])

    const handleFilterChange = (Event) => {
        setFilterString(Event.target.value)
        console.log('setFilter: ', filterString)
        setSelectedCountry({})
    }


    return (
        <div>
            <label>find countries </label>
            <input onChange={handleFilterChange} />
            <Content
                selectedCountry={selectedCountry}
                countries={countries}
                filterString={filterString}
                setSelectedCountry={setSelectedCountry}
            />
        </div>


    )


}

export default App;
