const Course = (props) => (
    props.courses.map(course =>
    <table key={course.id}>
      <tbody>
        <tr>
          <td>
          <Header course={course.name} />
          </td>
        </tr>
        <tr>
          <td>
          <Content parts={course.parts} />
          </td>
        </tr>
        <tr>
          <td>
          <Total parts={course.parts} />
          </td>
        </tr>
      </tbody>
    </table>
    )
  )

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      props.parts.map(part => 
      <div key={part.id}>
        <Part name={part.name} exercises={part.exercises}/>
        </div>
      )
    )
  }
  
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

  export default Course