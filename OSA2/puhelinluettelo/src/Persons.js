import React from 'react'


const Persons = ({ persons, filter, deletePerson }) => {

    return (persons.filter(person => person.name.includes(filter)).map((person) => {
        return (/*  console.log(person) || */
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => { deletePerson(person.id) }} >delete</button>
            </div>
        )
    }))
}

export default Persons