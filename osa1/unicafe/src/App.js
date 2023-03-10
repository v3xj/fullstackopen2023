import { useState } from 'react'

const Statistics = (props) => {
  if (props.feedback.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.feedback.good} />
        <StatisticLine text="neutral" value={props.feedback.neutral} />
        <StatisticLine text="bad" value={props.feedback.bad} />
        <StatisticLine text="total" value={props.feedback.total} />
        <StatisticLine text="average" value={props.feedback.average / props.feedback.total} />
        <StatisticLine text="positive" value={(props.feedback.good / props.feedback.total) * 100 + '%'} />
       </tbody>
     </table>
   )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0, total: 0, average: 0
  })

  const handleGoodClick = () => {
    const newClicks = {
      good: feedback.good + 1,
      neutral: feedback.neutral,
      bad: feedback.bad,
      total: feedback.total + 1,
      average: feedback.average + 1
    }
    setFeedback(newClicks)
  }

  const handleNeutralClick = () => {
    const newClicks = {
      good: feedback.good,
      neutral: feedback.neutral + 1,
      bad: feedback.bad,
      total: feedback.total + 1,
      average: feedback.average
    }
    setFeedback(newClicks)
  }

  const handleBadClick = () => {
    const newClicks = {
      good: feedback.good,
      neutral: feedback.neutral,
      bad: feedback.bad + 1,
      total: feedback.total + 1,
      average: feedback.average - 1
    }
    setFeedback(newClicks)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
      </div>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
      </div>
      <div>
        <Statistics feedback={feedback}/>
      </div>
    </div>
  )
}

export default App