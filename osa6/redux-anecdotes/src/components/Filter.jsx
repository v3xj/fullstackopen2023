import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    if (filter !== '') {
      console.log('KUTSUTAAN FILTERCHANGE: ', filterChange(filter))
      dispatch(filterChange(filter))
    }
    else {
      dispatch(filterChange(''))
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter