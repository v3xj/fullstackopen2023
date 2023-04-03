import Languages from './Languages'

const Country = (props) => {
    var country = props.country[0]
    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>
            capital: {country.capital}
            </div>
            <div>
            area: {country.area}
            </div>
            <h3>languages:</h3>
            <ul>
            <Languages languages={country.languages} />
            </ul>
            <div>
            <img src={country.flags.png}></img>
            </div>
        </div>
    )
}

export default Country