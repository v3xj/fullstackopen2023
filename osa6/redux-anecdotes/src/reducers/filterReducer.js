import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'ALL', 
  payload: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log('INITIAL STATE: ', initialState)
      console.log('ACTION: ', action)
      const filter = action.payload
      console.log('FILTER IN SLICE: ', filter)
      return {
        type: 'SET_FILTER',
        payload: filter,
      }
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer