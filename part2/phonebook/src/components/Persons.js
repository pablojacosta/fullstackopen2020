import React from 'react'
import PersonDetails from './PersonDetails'

const Persons = ({namesToShow, handleDeleteButton}) => {
    // console.log(props)
    return(
        <div>
          {namesToShow.map(person =>
             <PersonDetails 
                key={person.id} 
                name={person.name} 
                number={person.number}
                handleDeleteButton={() => handleDeleteButton(person.name, person.id)}
              />
           )}
        </div>
    )
}

export default Persons