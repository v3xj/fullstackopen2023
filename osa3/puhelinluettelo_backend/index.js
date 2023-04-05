const express = require('express')
const app = express()

let persons = [
    {
      id: 1,
      name: "Ada Lovelace",
      number: "040-5555555"
    },
    {
      id: 2,
      name: "Dan Abramov",
      number: "050-9999999"
    },
    {
      id: 3,
      name: "Alan turing",
      number: "010101010101010"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })