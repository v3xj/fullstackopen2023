import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average / props.all} />
        <StatisticLine text="positive" value={props.good / props.all * 100 + '%'} />
       </tbody>
     </table>
   )
}

const StatisticLine = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAverage(average + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAverage(average - 1)
    setAll(all + 1)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
      </div>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <div>
        <h1>Statistics</h1>
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} average={average} all={all} />
      </div>
    </div>
  )
}

export default App