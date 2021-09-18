import React, { useState, useEffect } from 'react'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import Persons from './Persons.js'
import personsServive from './services/personsService.js'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        personsServive.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    const addPerson = (Event) => {
        Event.preventDefault()
        let isNewName = true
        persons.every(person => {
            if (person.name === newName) { isNewName = false; return false }
            else return true
        })

        if (isNewName) {
            personsServive.create({ name: newName, number: newNumber })
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                }).catch(err => { alert(`Failed. Error: ${err}`) })
        }
        else {
            const confirm = window.confirm(`${newName} is alredy in the phonebook, replace the number with new one?`)
            if (confirm) {
                const person = persons.find(p => p.name === newName)
                personsServive.update(person.id, { ...person, number: newNumber })
                    .then(response => {
                        debugger
                        personsServive.getAll().then(response => {
                            setPersons(response.data);
                            setNewName('');
                            setNewNumber('')
                        }).catch(err => alert(`Error in updating ui of persons number. ${err}`))
                    }
                    ).catch(err => alert(`Error updating persons number. err:${err}`))

            }
        }

    }

    const deletePerson = id => {
        const personToDelete = persons.find(p => p.id === id)
        const confirmed = window.confirm(`Delete ${personToDelete.name} id:${id}?`)
        if (confirmed) {
            console.log(`Deleting ${personToDelete.name}`)
            personsServive.deletePerson(id)
                .then(response => {
                    console.log(`Deleted person: ${personToDelete.name}`)
                    setPersons(persons.filter(p => p.id !== id))
                }).catch(err => { console.log(err) })
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
            <h3>Add a new person</h3>
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
        </div>
    )

}

export default App