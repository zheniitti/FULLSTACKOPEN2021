import React from 'react'


const Persons = ({ persons, filter }) => {
    return (persons.filter(person => person.name.includes(filter)).map((person) => {
        return (/*  console.log(person) || */
            <div key={person.name}>
                <p>{person.name} {person.number}</p>
            </div>
        )
    }))
}

export default Persons