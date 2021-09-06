import React, { useState, useEffect } from "react";
import axios from 'axios'



const CountriesToSHow = ({ countries, filterWord }) => {
    const countriesToShow = countries.filter(country => country.name.includes(filterWord))
    debugger
    console.log(countriesToShow[0])
    return (
        countriesToShow.map(c => {
            return (<div key={c.name}>

                <p>{c.name}</p>
                <button >show</button>
            </div>
            )
        })
    )
}

const App = () => {

    const [filterWord, setFilterWord] = useState('')
    const [countries, setResponse] = useState([])
    const [showAll, setShowAll] = useState(false)

    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(resp => {
            console.log('promise fulfilled')
            setResponse(resp.data)
        })
    };

    useEffect(hook, [])

    const handleFilterChange = (Event) => {
        setFilterWord(Event.target.value)
        console.log('setFilter: ', filterWord)
    }



    return (
        <div>
            <label>find countries </label>
            <input onChange={handleFilterChange} />
            <CountriesToSHow countries={countries} filterword={filterWord} />
        </div>


    )


}

export default App;
