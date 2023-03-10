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
      <div>
        <div>
          good {props.feedback.good}
        </div>
        <div>
          neutral {props.feedback.neutral}
        </div>
        <div>
          bad {props.feedback.bad}
        </div>
        <div>
          all {props.feedback.good + props.feedback.neutral + props.feedback.bad}
        </div>
        <div>
          average {props.feedback.average / props.feedback.total}
        </div>
        <div>
          positive {(props.feedback.good / props.feedback.total) * 100} %
        </div>
      </div>
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