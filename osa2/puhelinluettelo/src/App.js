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

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

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
    names.includes(newName) 
    ? alert(`${newName} is already added to phonebook`) 
    : personService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
     })
  }

  const deletePerson = (id) => {
    personService.remove(id)
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
