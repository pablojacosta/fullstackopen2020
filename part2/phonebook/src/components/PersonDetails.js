import React from 'react'

const PersonDetails = ({name, number, handleDeleteButton}) => {
    return (
      <p>{name} {number}<button onClick={handleDeleteButton}>Delete</button></p> 
    )
  }

  export default PersonDetails


