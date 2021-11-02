const mongoose = require('mongoose')

if (
  process.argv.length < 3 ||
  (process.argv.length > 3 && process.argv.length < 5)
) {
  console.log(
    'Inproper entry, check if : node mongo.js password name number (check if there is quote for "name name")'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack_amutha:${password}@cluster0.eqxje.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

// GENERATE NEW NOTE DATA IN mongoDB database

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 5) {
  person.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}

// Fetching objects from the database mongoDB
if (process.argv.length === 3) {
  Person.find({}).then((person) => {
    console.log('Phonebook:')

    person.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}
// search only specific database
Person.find({ important: true }).then((result) => {
  result.forEach((person) => {
    console.log(person)
  })
  mongoose.connection.close()
})
