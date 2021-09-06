import React from 'react'


const Filter = ({ handleFilterChange }) => {
    return (<div>
        <label>filter shown with </label>
        <input onChange={handleFilterChange} />
    </div>
    )
}

export default Filter