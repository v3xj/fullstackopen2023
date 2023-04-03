const Languages = (props) => {

    const all = Object.values(props.languages)
    console.log(all)
    return (
        all.map(lang => (
          <li key={props.lang}>
            {lang}
          </li>
        ))
    )
}

export default Languages