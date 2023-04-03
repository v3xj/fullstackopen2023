const Countries = (props) => {
  if (props.countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter 
      </div>
    )
  }
  else {
    return (
    <div>
        {props.countriesToShow.map(country => 
            <div key={country.name.common}>
              {country.name.common} 
            </div>)}
      </div>
    )
  }
}
  
export default Countries