const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { defaults } = require('lodash')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('blogs are returned as JSON and id fields are correctly titled', () => {
  
  test('all blogs are returned and they are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
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
      likes: 666
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
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
      .expect(201)
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
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    await api
      .get('/api/blogs')
      .expect(200)
  
    const response = await api.get('/api/blogs')
    const blogList = response.body.map(r => r)
    expect(response.body).toHaveLength(initialBlogs.length+1)
    
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
      .expect(201)
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

afterAll(async () => {
  await mongoose.connection.close()
})