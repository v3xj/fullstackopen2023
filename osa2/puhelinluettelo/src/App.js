import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState(
    'a new name'
  )

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
          <div>debug: {newName} </div>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <div key={person.id}>{person.content}</div>
          )}
    </div>
  )

}

export default App
