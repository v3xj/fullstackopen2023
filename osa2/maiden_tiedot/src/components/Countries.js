import Country from './Country'

const Countries = (props) => {
  if (props.countriesToShow.length === 1) {
      return (
          <Country country={props.countriesToShow} />
      )
    
  }
  if (props.countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter 
      </div>
    )
  }
  if (1 < props.countriesToShow.length < 10) {
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