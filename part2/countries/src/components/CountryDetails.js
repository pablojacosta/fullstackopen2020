import React from 'react'
 
const CountryDetails = ({name, capital, population, languages, flag}) => {

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul> 
            <img src={flag} width="150px" alt={`Flag of ${name}`}></img>   
        </div>
    )
}

export default CountryDetails
