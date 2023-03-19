import { useState } from 'react'

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input 
        value={newFilter} 
        onChange={handleFilterChange} />
      </div>
      <div>
        filter debug: {newFilter}
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
          <div>debug: {newName} {newNumber}</div>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        {personsToShow.map(person => 
          <div key={person.id}>{person.content} {person.number}</div>)}
      </div>
    </div>
  )

}

export default App
