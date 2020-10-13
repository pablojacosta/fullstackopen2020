import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const modifyPerson = (id, persons, newName, newNumber) => {
    const person = persons.find(person => person.name === newName)
    const changedPerson = {...person, number: newNumber}
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    return request.then(response => response)
}

export default { getAll, create, deletePerson, modifyPerson }