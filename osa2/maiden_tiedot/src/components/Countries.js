const Countries = (props) => {
    return (
      <div>
        {props.countriesToShow.map(country => 
            <div key={country.name.common}>
              {country.name.common} 
            </div>)}
      </div>
    )
  }
  
  export default Countries