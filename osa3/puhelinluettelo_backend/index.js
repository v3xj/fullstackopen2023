const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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
    },
    {
      id:4,
      name: "Buckethead",
      number: "044-424242424"
    }
]

const personsTotal = persons.length

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelon backend</h1>')
})

app.get('/info', (request, response) => {
    const requestTime = new Date();
    response.send('<div>Phone book has info for ' + personsTotal + ' people</div>' +
    '<div>' + requestTime + '</div>')
    
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * (Math.ceil(1) * Math.floor(99999999)) + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.filter(person => 
        person.name.toLowerCase().includes(body.name))) {
            return response.status(400).json({
                error: ' name must be unique'
            })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }


    persons = persons.concat(person)
    response.json(person)
})
  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})