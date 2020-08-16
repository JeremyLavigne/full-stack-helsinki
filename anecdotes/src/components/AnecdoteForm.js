import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const blocStyle = { marginBottom : 5 }
  const buttonStyle = { marginLeft : 5 }

  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  anecdotes.sort(function(an1,an2){
        return an2.votes - an1.votes
    })

  const voteClicked = (id) => {
    dispatch(addVote(id))

    dispatch(displayNotification('Thank you for your vote!'))
    setTimeout(function(){ 
      dispatch(hideNotification())
    }, 3000);
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={blocStyle}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button style={buttonStyle} onClick={(id) => voteClicked(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm