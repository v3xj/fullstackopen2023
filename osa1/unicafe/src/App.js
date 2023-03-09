import { useState } from 'react'

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [average, setAverage] = useState({
    average: 0
  })

  const handleGoodClick = () => {
    const newClicks = {
      good: feedback.good + 1,
      neutral: feedback.neutral,
      bad: feedback.bad,
    }
    const newAverage = {
      average: average.average + 1
    }
    setFeedback(newClicks)
    setAverage(newAverage)
  }

  const handleNeutralClick = () => {
    const newClicks = {
      good: feedback.good,
      neutral: feedback.neutral + 1,
      bad: feedback.bad,
      average: average.average
    }
    const newAverage = {
      average: average.average
    }
    setFeedback(newClicks)
    setAverage(newAverage)
  }

  const handleBadClick = () => {
    const newClicks = {
      good: feedback.good,
      neutral: feedback.neutral,
      bad: feedback.bad + 1,
      average: average.average - 1
    }
    const newAverage = {
      average: average.average - 1
    }
    setFeedback(newClicks)
    setAverage(newAverage)
  }


  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
      good {feedback.good}
      </div>
      <div>
      neutral {feedback.neutral}
      </div>
      <div>
      bad {feedback.bad}
      </div>
      <div>
        all {feedback.good + feedback.neutral + feedback.bad}
      </div>
      <div>
        average {average.average / (feedback.good + feedback.neutral + feedback.bad)}
      </div>
      <div>
        positive {feedback.good / (feedback.good + feedback.neutral + feedback.bad) * 100} %
      </div>
    </div>
  )
}

export default App