const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1,})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, blogs } = request.body

  const users = await User.find({})
  const usernames = users.map(u => u.username)

  if (usernames.includes(username)) {
    return response.status(400).json({
      error: 'username already in use, please enter another username'
    })
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    blogs
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = usersRouter