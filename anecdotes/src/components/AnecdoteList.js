import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const [ newAnecdote, setNewAnecdote ] = useState('')

  const createNewAnecdote = (event) => {
    event.preventDefault()

    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div><input value={newAnecdote} onChange={({target}) => setNewAnecdote(target.value)}/></div>
        <button onClick={createNewAnecdote}>create</button>
      </form>
    </div>
  )
}

export default AnecdoteList