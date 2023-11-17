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
      const content = action.payload
      if (action.type === 'notification/showNotification') {
        return {
          type: 'notification/showNotification',
          payload: content
        }
      }
    },
    hideNotification(state, action) {
      if (action.type === "notification/hideNotification") {
        return {
          type: 'notification/hideNotification',
          payload: ''
        }
      }
    },
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch({
      type: 'notification/showNotification',
      payload: content
    })
    setTimeout(() => {
      dispatch({
        type: 'notification/hideNotification',
        payload: ''
      })
    }, time*1000)
  }
}

export default notificationSlice.reducer