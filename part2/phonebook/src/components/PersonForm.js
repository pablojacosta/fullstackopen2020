import React from 'react'

const PersonForm = ({addNameAndNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addNameAndNumber}>
            <div>
                Name: 
                <input 
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                Phone: 
                <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm