import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const [ newAnecdote, setNewAnecdote ] = useState('')

  const createNewAnecdote = async (event) => {
    event.preventDefault()

    const newOne = await anecdoteService.createNew(newAnecdote)
    dispatch(createAnecdote(newOne))

    dispatch(displayNotification('Anecdote created successfully'))
    setTimeout(function(){ 
      dispatch(hideNotification())
    }, 3000);
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