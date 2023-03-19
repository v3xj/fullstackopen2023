import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    /* TESTIDATAA */
    /*
    { content: 'Arto Hellas', number: '040-123456', id: 1 },
    { content: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { content: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { content: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    */
    
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

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => 
      person.content.toLowerCase().includes(newFilter)) 

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const names = persons.map(person => person.content)
    names.includes(newName) 
    ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(nameObject))

    setNewName('')
    setNewNumber('')
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
        <Persons personsToShow={personsToShow} />
      </div>
    </div>
  )

}


export default App
