import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blog, setBlog] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusCode, setStatusCode] = useState()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUsername(user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({message, code}) => {
    if (message === null) {
      return null
    }
    if (code === 1) {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    if (code === 0) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setStatusCode(0)
      setStatusMessage('invalid username or password')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setStatusCode(0)
      setStatusMessage('logout failed')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
    console.log('logging out')
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      if (title.length > 0 && author.length > 0 && url.length > 0) {
        const blog = await blogService.createNew({
          title, author, url
        })
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
        setBlog(blog)
        setStatusCode(1)
        setStatusMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }
      
    } catch (exception) {
      console.log(exception)
      setStatusCode(0)
      setStatusMessage('creating new blog failed')
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)

    }
  }
 
  if (user !== null) {
    return (
      <div>
      <h2>blogs</h2>
      <Notification message={statusMessage} code={statusCode} />
      <h3>logged in as {username}
      <button onClick={handleLogout}>log out</button></h3>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    )
  }
  
  return (
    <div>
      <h2>Login</h2>
      <Notification message={statusMessage} code={statusCode} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  
}

export default App