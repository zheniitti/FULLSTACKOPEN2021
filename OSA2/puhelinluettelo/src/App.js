import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import Persons from './Persons.js'



const App = () => {



    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }

    useEffect(hook, [])

    const addPerson = (Event) => {
        Event.preventDefault()
        console.log(Event.target)
        let isNewName = true
        persons.every(person => {
            if (person.name === newName) { isNewName = false; alert(`${person.name} is already added to phonebook`); return false }
            else return true
        })

        if (isNewName) {
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
        }

    }

    const handleNameChange = (Event) => {
        setNewName(Event.target.value)
    }

    const handleNumberChange = (Event) => {
        setNewNumber(Event.target.value)
    }

    const handleFilterChange = (Event) => {
        setNewFilter(Event.target.value)
        console.log('filter changed', newFilter)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={newFilter} />
        </div>
    )

}

export default App