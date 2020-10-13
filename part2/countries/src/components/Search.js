import React from 'react'

const Search = ({showCountries, handleShowChange}) => {
    return (
        <div>
            Find countries:
            <input
                value={showCountries}
                onChange={handleShowChange}
            />    
        </div>
    )
}

export default Search