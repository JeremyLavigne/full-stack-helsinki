import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({content}) => {
  return (
    <h1>{content}</h1>
  )
}

const Anecdote = ({anecdote}) => {
  return (
      <p>{anecdote}</p>
  )
}

const Votes = ({points}) => {
  return (
      <p>This anecdote has {points} votes</p>
  )
}

const Button = ({onClick, selected, content}) => {
  return (
      <button onClick={(anecdotePosition) => onClick(selected)}>{content}</button>
  )
}

const Buttons = ({onClick, onClick2, selected}) => {
  return (
    <>
      <Button 
        onClick={(anecdotePosition) => onClick2(anecdotePosition)}
        selected={selected}
        content="Vote"
      />
      <Button 
        onClick={() => onClick()}
        content="Next anecdote"
      />
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [bestOne, setBestOne] = useState(0)

  const changeAnecdote = ()  => {
    let indiceOfNextAnecdote 
    // Avoid a random number equals to the current anecdote 
    do {
      indiceOfNextAnecdote = Math.floor(Math.random() * anecdotes.length )
    }while (indiceOfNextAnecdote === selected);

    setSelected(indiceOfNextAnecdote)
  }

  const voteForAnecdote = (anecdotePosition)  => {
    //Add 1 vote
    const newPoints = {...points}
    newPoints[anecdotePosition] += 1 
    setPoints(newPoints)

    //Extract indice of the max votes anecdote (better way to do it?)
    let max = 0;
    let maxIndice = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (newPoints[i] >= max) {
        max = newPoints[i]
        maxIndice = i
      }
    }  
    setBestOne(maxIndice)
  }

  return (
    <div>
      <div>
        <Title content="Anecdote of the day" />
        <Anecdote anecdote={anecdotes[selected]} />
        <Votes points={points[selected]} />
        <Buttons 
          onClick={changeAnecdote}
          onClick2={voteForAnecdote}
          selected={selected}
        />
      </div>

      <div>
        <Title content="Anecdote With the most votes" />
        <Anecdote anecdote={anecdotes[bestOne]} />
        <Votes points={points[bestOne]} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
