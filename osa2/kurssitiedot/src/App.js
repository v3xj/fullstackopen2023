const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    }
    ]
  }

  return (
      <Course course={course} />
  )
}

const Course = (props) => (
  <table>
    <tbody>
      <tr>
        <td>
        <Header course={props.course.name} />
        </td>
      </tr>
      <tr>
        <td>
        <Content parts={props.course.parts} />
        </td>
      </tr>
      <tr>
        <td>
        <Total parts={props.course.parts} />
        </td>
      </tr>
    </tbody>
  </table>
)

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => (
  props.parts.map(part => 
  <div key={part.id}>
    <Part name={part.name} exercises={part.exercises}/>
    </div>
  )
)

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  
  const allExercises = props.parts.map(part => part.exercises)
  let numberOfExercises = allExercises.reduce((a, b) => a + b, 0)
  
  return (
    <div>
      <b>Number of exercises {numberOfExercises}</b>
    </div>
  )
}

export default App