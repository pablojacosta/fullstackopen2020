import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <table>
      <colgroup>
        <col style={{width: 10 + 'em'}}></col>
      </colgroup>
      <tbody>
        <tr>
          <th>{props.name}</th> 
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  console.log(props)
  
  if (props.categories[3].value === 0) {
    return (
      <div>
        <p><strong>No feedback given</strong></p>  
      </div>
    )
  }

  return (
      <div>
        <Statistic name={props.categories[0].name} value={props.categories[0].value} />
        <Statistic name={props.categories[1].name} value={props.categories[1].value} />
        <Statistic name={props.categories[2].name} value={props.categories[2].value} />
        <Statistic name={props.categories[3].name} value={props.categories[3].value} />
        <Statistic name={props.categories[4].name} value={props.categories[4].value.toFixed(1)} />
        <Statistic name={props.categories[5].name} value={props.categories[5].value.toFixed(1) + '%'} />
        
      </div>
    )
  

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const badAverageScore = bad * -1
  const averageScore = (good + badAverageScore) / total
  const statistics = {
    name: 'Statistics',
    categories: [
      {
        name: 'Good',
        value: good
      },
      {
        name: 'Neutral',
        value: neutral
      },
      {
        name: 'Bad',
        value: bad
      },
      {
        name: 'Total',
        value: total
      },
      {
        name: 'Average Score',
        value: averageScore
      },
      {
        name: 'Positive Feedback',
        value: (good / total) * 100
      }
    ]
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <p><strong>Give Feedback</strong></p>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <p><strong>Statistics</strong></p>
      <Statistics categories={statistics.categories} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)