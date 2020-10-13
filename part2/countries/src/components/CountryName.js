import React from 'react'

const CountryName = ({name, handleButtonClick}) => {
    return (
        <p>{name} <button onClick={() => handleButtonClick(name)}>Show</button></p>     
    )
}

export default CountryName