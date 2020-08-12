// .env
require('dotenv').config()

// Express
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.static('build'))

// Cors
const cors = require('cors')
app.use(cors())

// Morgan
const morgan = require('morgan')

morgan.token('namePerson', function namePerson(req) { return `{ "name" : "${req.body.name}", ` })
morgan.token('numberPerson', function numberPerson(req) { return `"number" : "${req.body.number}" }` })

app.use(morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === 'GET') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
        ].join(' ')
    } else {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens.namePerson(req, res),
            tokens.numberPerson(req, res)
        ].join(' ')
    }
}))

// MongoDB
const Person = require('./models/person')

// ----------------------------------------------------------------------

// Get All
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

// Get specific
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

// Delete
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result !== null)
            res.status(204).end()
        })
        .catch(error => {
            console.log('error is when deleting :', error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

// Add new person
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

// Update person
app.put('/api/persons/:id', (req, res) => {

    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => {
            console.log('error is when updating :', error)
            res.status(400).send({ error: 'something wrong id' })
        })
})

// Listening Port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})