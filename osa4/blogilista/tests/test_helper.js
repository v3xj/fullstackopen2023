const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'A nice day of coding',
    author: 'v3xj',
    url: 'test',
    likes: 999
  },
  {
    title: 'Another day of failing',
    author: 'v3xj',
    url: 'test',
    likes: 888
  },
  {
    title: "But I don't care",
    author: 'v3xj',
    url: 'test',
    likes: 777
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}