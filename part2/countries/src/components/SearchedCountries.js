import React from 'react'
import CountryName from './CountryName'


const SearchedCountries = ({countriesToShow, handleButtonClick}) => {
    return (
        <div>
            {countriesToShow.map(country => 
                <CountryName 
                    key={country.name} 
                    name={country.name}
                    handleButtonClick={handleButtonClick}
                    countriesToShow={countriesToShow}
                />
            )}
            
        </div>
    )
}

export default SearchedCountries