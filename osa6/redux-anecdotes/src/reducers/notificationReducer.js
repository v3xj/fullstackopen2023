import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  type: 'notification/hideNotification',
  payload: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('ACTION IN showNotification: ', action)
      const content = action.payload
      if (action.type === 'notification/showNotification') {
        return {
          type: 'notification/showNotification',
          payload: content
        }
      }
    },
    hideNotification(state, action) {
      console.log('ACTION IN hideNotification: ', action)
      if (action.type === "notification/hideNotification") {
        return {
          type: 'notification/hideNotification',
          payload: ''
        }
      }
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer