import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {

  const newAnecdote = {
    content: content,
    id: getId(),
    votes: 0
  }

  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export default { getAll, createNew }