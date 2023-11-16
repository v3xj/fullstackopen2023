import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  type: 'notification',
  payload: 'TEST NOTIFICATION',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return {
        type: 'notification',
        payload: content
      }
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer