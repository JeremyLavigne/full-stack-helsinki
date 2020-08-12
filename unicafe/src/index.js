import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const Stats = ({stats}) => {
  let all = stats[0] + stats[1] + stats[2]
  let average = 0;
  let positive = 0

  if (all !== 0) {
    average = (stats[0]-stats[2])/all
  }

  if (all !== 0) {
    positive = stats[0]/all
  }

  return (
    <>
      <p>Good stats : {stats[0]} </p>
      <p>Neutral stats : {stats[1]} </p>
      <p>Bad stats : {stats[2]} </p>
      <p>All : {all} </p>
      <p>Average : {average} </p>
      <p>Positive : {positive} % </p>
    </>
  )
}

const Statistics = ({stats}) => {
  if ((stats[0] + stats[1] + stats[2]) > 0) {
    return (
      <div>
        <Title title="Statistics" />
        <Stats stats={stats}/>
      </div>
    )
  }

  return (
    <div>
      <Title title="Statistics" />
      <p>No feedback given yet</p>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <p>
      <button onClick={(buttonName) => props.onClick("good")}>Good</button>
      <button onClick={(buttonName) => props.onClick("neutral")}>Neutral</button>
      <button onClick={(buttonName) => props.onClick("bad")}>Bad</button>
    </p>
  )
}

const Feedback = (props) => {
  return (
    <div>
      <Title title="Give your feedback" />
      <Buttons onClick={(buttonName) => props.onClick(buttonName)}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = [good, neutral, bad]

  const handleClick = (buttonName) => {
    switch (buttonName) {
      case "good":
        setGood(good + 1)
        break;
      case "neutral":
        setNeutral(neutral + 1)
        break;
      case "bad":
        setBad(bad + 1)
        break;
      default: 
        console.log("I don't know what happened")
    }
  }

  return (
    <div>
      <Feedback onClick={handleClick}/>
      <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)