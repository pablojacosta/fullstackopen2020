import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>{props.text}</button>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState([0, 0, 0, 0, 0, 0])
  //const maxVoted = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
  const maxVoted = votes.indexOf(Math.max(...votes));

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVoted(copyVotes)
  }

  return (
    <div>
      <p><strong>Anecdote of the day</strong></p>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleClick} text='Next Anecdote' />
      <p><strong>Anecdote with most votes</strong></p>
      <p>{props.anecdotes[maxVoted]}</p>
      <p>Has {votes[maxVoted]} votes</p>

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