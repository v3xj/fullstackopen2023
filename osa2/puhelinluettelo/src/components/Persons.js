const Persons = (props) => {
    return (
      <div>
        {props.personsToShow.map(person => 
            <div key={person.id}>{person.content} {person.number}</div>)}
      </div>
    )
  }

export default Persons