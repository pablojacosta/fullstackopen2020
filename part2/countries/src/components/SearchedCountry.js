import React from 'react'
import CountryDetails from './CountryDetails'

const SearchedCountry = ({countriesToShow}) => {
    
    return (
        <div>
            {countriesToShow.map(country => 
                <CountryDetails 
                    key={country.name} 
                    name={country.name} 
                    capital={country.capital}
                    population={country.population}
                    languages={country.languages}
                    flag={country.flag}
                    countriesToShow={countriesToShow}
                /> 
            )}
        </div>        
    )
}

export default SearchedCountry