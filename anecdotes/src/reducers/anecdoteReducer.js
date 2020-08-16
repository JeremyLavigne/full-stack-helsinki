  export const addVote = (id) => {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  }

  export const createAnecdote = (data) => {
    return {
      type: 'NEW_ANECDOTE',
      data,
    }
  }

  export const filterAnecdotes = (filter) => {
    return {
      type: 'FILTER',
      data: {
        filter: filter
      }
    }
  }

  export const initializeAnecdotes = (anecdotes) => {
    return {
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    }
  }
  
  const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
      case 'VOTE' :
        return state.map(anecdote => 
            anecdote.id !== action.data.id ?
            anecdote :
            {
              content: anecdote.content,
              id: anecdote.id,
              votes: anecdote.votes + 1
            } )
      case 'NEW_ANECDOTE' :
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
      case 'FILTER' :
        return state.filter(anecdote => 
            anecdote.content.includes(action.data.filter))
      default: return state
    }
  }
  
  export default anecdoteReducer