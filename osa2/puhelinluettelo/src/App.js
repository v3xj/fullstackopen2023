import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState(
    ''
  )
  const [newNumber, setNewNumber] = useState(
    ''
  )

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const names = persons.map(person => person.content)

    names.includes(newName) ? 
    alert(`${newName} is already added to phonebook`) :
    setPersons(persons.concat(nameObject))

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
        {persons.map(person =>
          <div key={person.id}>{person.content} {person.number} </div>
          )}
    </div>
  )

}

export default App
