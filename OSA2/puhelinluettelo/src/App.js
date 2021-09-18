import React, { useState, useEffect } from 'react'
import Filter from './Filter.js'
import PersonForm from './PersonForm.js'
import Persons from './Persons.js'
import personsServive from './services/personsService.js'

const Notification = ({ isSuccesful, message }) => {
    const notificationStyle = {
        color: isSuccesful ? 'green' : 'red',
        borderColor: isSuccesful ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        bordertyle: 'solid',
        borderRadius: 5,
        padding: 10,

    }

    if (message === null) { console.log('Notification message is null'); return null }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )

}


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [isSuccesful, setIsSuccesful] = useState(true)
    const [timerId, setTimerId] = useState(null)

    useEffect(() => {
        personsServive.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    const setNotification = (succesful, message) => {
        setIsSuccesful(succesful)
        setNotificationMessage(message)
        clearTimeout(timerId)
        const timerNumber = setTimeout(() => { console.log(`Timeout: ${message}`); setNotificationMessage(null) }, 6000)
        setTimerId(timerNumber)
    }

    const addPerson = (Event) => {
        Event.preventDefault()

        if (newNumber === '' || newName === '') {
            /* alert('Number is empty') */
            setNotification(false, 'Name or number is empty')
            return
        }

        let isNewName = true
        persons.every(person => {
            if (person.name === newName) { isNewName = false; return false }
            else return true
        })

        if (isNewName) {
            personsServive.create({ name: newName, number: newNumber })
                .then(response => {
                    setNotification(true, `Successfully added ${newName} to server`)
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => { /* alert(`Failed. Error: ${err}`) */
                    setNotification(false, `Failed. Error: ${err}`)
                })
        }
        else {
            const confirm = window.confirm(`${newName} is alredy in the phonebook, replace the number with new one?`)
            if (confirm) {
                const person = persons.find(p => p.name === newName)
                personsServive.update(person.id, { ...person, number: newNumber })
                    .then(response => {
                        setNotification(true, `Successfully changed ${response.data.name}'s number.`)
                        personsServive.getAll().then(response => {
                            setPersons(response.data);
                            setNewName('');
                            setNewNumber('')
                        }).catch(err => alert(`Persons number updated in the server but error in updating UI. ${err}`))
                    }
                    ).catch(err => {
                        //alert(`Error updating persons number. ${err}`)
                        if (err.response.status === 404) {
                            setNotification(false, `${person.name} doesn't exist or it is deleted.`)
                            personsServive.getAll().then(response => {
                                setPersons(response.data)
                            })
                        }
                    })

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
                    setNotification(true, `Successfully deleted ${personToDelete.name} from server.`)
                    console.log(`Deleted person: ${personToDelete.name}`)
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setNotification(false, `${personToDelete.name} is already deleted from server.`)
                        personsServive.getAll().then(response => {
                            setPersons(response.data)
                        })
                    }
                })
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
            <Notification isSuccesful={isSuccesful} message={notificationMessage} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
        </div>
    )

}

export default App