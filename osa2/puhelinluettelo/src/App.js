import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
    
  ]) 
  const [newName, setNewName] = useState(
    ''
  )
  const [newNumber, setNewNumber] = useState(
    ''
  )
  const [newFilter, setFilter] = useState(
    ''
  )
  const [showAll, setShowAll] = useState(true)
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusCode, setStatusCode] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const Notification = ({message, code}) => {
    if (message === null) {
      return null
    }
    if (code === 1) {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    if (code === 0) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  }

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => 
      person.name.toLowerCase().includes(newFilter)) 

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const names = persons.map(person => person.name)
     if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToEdit = persons.find(personObject => personObject.name === newName)
        personService.update(personToEdit.id, nameObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToEdit.id ? person : returnedPerson))
          setStatusCode(1)
          setStatusMessage(
            `Number of '${returnedPerson.name}' successfully updated to server`
          )
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
        }).catch(error => {
          setStatusCode(0)
          setStatusMessage(
            `Person '${personToEdit.name}' has already been removed from server`
          )
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          setPersons(
            persons.filter((person) => {
               return person.name !== personToEdit.name;
            })
          );
          setNewName('')
          setNewNumber('')
        });
      }
    }
    else {
      personService.create(nameObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setStatusCode(1)
          setStatusMessage(`Person '${returnedPerson.name}' successfully added to server`)
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')})
        .catch(error => {
          setStatusCode(0)
          setStatusMessage(error.response.data.error)
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(personObject => personObject.id === id)

    personService.remove(id)
    .then(
      setStatusCode(1),
      setStatusMessage(
        `Person '${personToDelete.name}' successfully deleted from server`
      ),
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    ).catch(error => {
      setStatusCode(0)
      setStatusMessage(
        `Person '${personToDelete.name}' has already been removed from server`
      )
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    });

    setPersons(
      persons.filter((person) => {
         return person.id !== id;
      })
    );
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} code={statusCode} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <div>
        <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      </div>
    </div>
  )
}



export default App
