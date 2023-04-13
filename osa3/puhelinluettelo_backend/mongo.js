const mongoose = require('mongoose')

const password = process.argv[2]
const personsName = process.argv[3]
const personsNumber = process.argv[4]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personsName,
  number: personsNumber,
})

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length===3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length===5) {
  person.save().then(result => {
    console.log(`added ${personsName} number ${personsNumber} to phonebook`)
    mongoose.connection.close()
  })
}

const url =
  `mongodb+srv://vjbrah:${password}@mooc.ydq4xmi.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
