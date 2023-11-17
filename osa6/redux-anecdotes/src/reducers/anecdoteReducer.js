/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '/services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sorted))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(obj => obj.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes : anecdoteToChange.votes + 1
    }
    await anecdoteService.update(id, changedAnecdote)
    const anecdotesNew = await anecdoteService.getAll()
    const sorted = anecdotesNew.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sorted))
  }
} 

export default anecdoteSlice.reducer