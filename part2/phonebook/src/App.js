import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(showAll))

  const namesToShow = showAll === '' ? persons : filteredNames

  const addNameAndNumber = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const repeatedPerson = persons.find(person => person.name === newName)
    let validationError = null

    if (repeatedPerson) {
      let result = window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)
      if (result === true) {
        const idForModify = [repeatedPerson].map(person => person.id)
        personService
          .modifyPerson(idForModify, persons, newName, newNumber)
          .then(response => {
            setPersons(persons.map(person => person.name !== newName ? person : response.data))
            setMessage(`${newName}'s Number Modified`)
            setTimeout(() => {setMessage(null)}, 5000)
          })
          .catch(error => {
            if (error.response.data.error === "Validation failed: name: Cannot read property 'ownerDocument' of null") {
              // if already deleted from server
              setPersons(persons.filter(person => person.id !== idForModify[0]))
              setErrorMessage(`${newName}'s information has already been removed from server`)
              setTimeout(() => {setErrorMessage(null)}, 5000)     
            } else {
              // if another validation error
              setErrorMessage(error.response.data.error)
              setTimeout(() => {setErrorMessage(null)}, 5000)
            } 
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        .catch(error => {
          validationError = error
          setErrorMessage(error.response.data.error)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
        .then(() => {
        if (!validationError) {
          setMessage(`Added ${newName} to Phonebook`)
          setTimeout(() => {setMessage(null)}, 5000)      
        }})
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    setShowAll(event.target.value)
  }

  const handleDeleteButton = (name, id) => {
    let result = window.confirm(`Delete ${name}?`)
    
    if (result === true) {
      personService
        .deletePerson(id)
        .then(response =>
          setPersons(persons.filter(person => person.id !== id))
        )
      setMessage(`${name} has been deleted from Phonebook`)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
    
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <ErrorMessage errorMessage={errorMessage} />
      <Filter showAll={showAll} handleShowChange={handleShowChange}/>
      <h2>Add a new Name and Number</h2>
        <PersonForm 
          addNameAndNumber={addNameAndNumber}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        
      <h2>Numbers</h2>
        <Persons 
          namesToShow={namesToShow} 
          handleDeleteButton={handleDeleteButton} 
        />
    </div>  
  )
}

export default App
