import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusCode, setStatusCode] = useState()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [blog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUsername(user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message, code }) => {
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
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setStatusCode(0)
      setStatusMessage("invalid username or password")
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
    console.log("logging in with", username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.clear()
      setUser(null)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setStatusCode(0)
      setStatusMessage("logout failed")
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
    console.log("logging out")
  }

  const handleCreateNew = ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()

    try {
      if (title.length > 0 && author.length > 0 && url.length > 0) {
        const blog = blogService.createNew({
          title, author, url
        })
        setBlog(blog)
        blogService.getAll().then(blogs =>
          setBlogs( blogs.sort((a, b) => b.likes - a.likes ))
        )
        setStatusCode(1)
        setStatusMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }

    } catch (exception) {
      console.log(exception)
      setStatusCode(0)
      setStatusMessage("creating new blog failed")
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)

    }
  }

  const handleLike = ({ title, author, url, likes, id }) => {
    blogService.addLike({ title, author, url, likes, id })
  }

  const handleDelete = ({ id }) => {
    try {
      blogService.deleteBlog({ id })
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a, b) => b.likes - a.likes ))
      )
      setStatusCode(1)
      setStatusMessage("blog deleted")
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    }
    catch (exception) {
      console.log(exception)
      setStatusCode(0)
      setStatusMessage("deleting blog failed")
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
          <BlogForm createBlog={handleCreateNew}/>
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleLike} deleteBlog={handleDelete} user={username}/>
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
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">log in</button>
      </form>
    </div>
  )

}

export default App