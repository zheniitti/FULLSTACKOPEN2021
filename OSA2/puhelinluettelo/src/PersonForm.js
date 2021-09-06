import React from 'react'


const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <label>name: </label>
                <input type='text' value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <label>number: </label>
                <input type='text' value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm