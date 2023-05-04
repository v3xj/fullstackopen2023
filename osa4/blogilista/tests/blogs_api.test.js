const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { defaults } = require('lodash')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('blogs are returned as JSON and id fields are correctly titled', () => {
  
  test('all blogs are returned and they are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the identification field is named "id" and not "_id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.map(r => r.id)).toBeDefined();
  })
})

describe('posting a new blog', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "A VALID BLOG ADDED",
      author: 'v3xj',
      url: 'test',
      likes: 666,
      user: "644d0baf11e250319bf8d006"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'A VALID BLOG ADDED'
    )
  })
})

describe('incomplete blog posting', () => {

  test('if value for "likes" is not given, it defaults to 0', async () => { 
    const blogWithNoLikes = {
      title: "THIS BLOG SHOULD HAVE ZERO LIKES",
      author: 'v3xj',
      url: 'test',
      likes: ''
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const blogList = response.body.map(r => r)
    const latestBlog = blogList[blogList.length-1]
    expect(latestBlog).toHaveProperty('title', 'THIS BLOG SHOULD HAVE ZERO LIKES')
    expect(latestBlog).toHaveProperty('likes', 0)
  })
  
  test('if blog does not contain "title" and "url", returns error code 400', async () => {
    const blogWithMissingInfo = {
      author: 'v3xj',
      likes: 999
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithMissingInfo)
      .expect(400)
  })
})

describe('blog deletion and updating', () => {

  test ('a single blog can be deleted', async () => {
    const newBlogToDelete = {
      title: "A BLOG TO DELETE",
      author: 'v3xj',
      url: 'test',
      likes: 1234
    }
  
    await api
      .post('/api/blogs')
      .send(newBlogToDelete)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    await api
      .get('/api/blogs')
      .expect(200)
  
    const response = await api.get('/api/blogs')
    const blogList = response.body.map(r => r)
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    
    const newestBlog = blogList[blogList.length-1]
  
    await api
      .delete('/api/blogs/'+ newestBlog.id)
      .expect(204)
  
  })
  
  test('a blog can be edited', async () => {
    const newBlogToEdit = {
      title: "A BLOG TO EDIT",
      author: 'v3xj',
      url: 'test',
      likes: 9999
    }
  
    await api
      .post('/api/blogs')
      .send(newBlogToEdit)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    await api
      .get('/api/blogs')
      .expect(200)
  
    const response = await api.get('/api/blogs')
    const blogList = response.body.map(r => r)
    const newestBlog = blogList[blogList.length-1]
  
    await api
      .put('/api/blogs/'+ newestBlog.id)
      .expect(200)
  
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'TESTAUS-TEPPO',
      name: 'Ville J',
      password: 'salainen',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username already in use, please enter another username')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when the minimum requirements of new user are not met', () => {
  test('user creation fails with too short username', async () => {

    const newUser = {
      username: 'u3',
      name: 'username under 3 characters',
      password: 'secret',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('user creation fails with too short password', async () => {

    const newUser = {
      username: 'over3',
      name: 'password under 3 characters',
      password: 'pw',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})