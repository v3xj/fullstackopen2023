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
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
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
          setSuccessMessage(
            `Number of '${returnedPerson.name}' successfully updated to server`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }
     }
     else {
      personService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(
          `Person '${returnedPerson.name}' successfully added to server`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
     })
     }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(personObject => personObject.id === id)
    personService.remove(id)
    setPersons(
      persons.filter((person) => {
         return person.id !== id;
      })
    );
    setSuccessMessage(
      `Person '${personToDelete.name}' successfully deleted from server`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
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
      <Notification message={successMessage} />
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
