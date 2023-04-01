import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState(
    ''
  )

  useEffect(() => {
    if (newFilter) {
      console.log('fetching countries...')
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [newFilter])

  const countriesToShow = countries.filter(country => 
      country.name.common.toLowerCase().includes(newFilter)) 

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
        <Countries countriesToShow={countriesToShow} />
      </div>
    </div>
  )
}

export default App;
