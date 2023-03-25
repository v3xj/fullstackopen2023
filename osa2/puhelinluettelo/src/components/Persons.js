
const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person => 
          <div key={person.id}>
            {person.name} {person.number}  
            <button onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)){
                props.deletePerson(person.id)}
              }}>delete</button>
          </div>)}
    </div>
  )
}

export default Persons