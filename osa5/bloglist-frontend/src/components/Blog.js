import { useState, useEffect, useRef } from 'react'

const Blog = ({blog, updateBlog, deleteBlog, user}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const pageRendered = useRef(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = { text: visible ? 'hide' : 'view'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (pageRendered.current) {
      updateBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes,
        id: blog.id
      })
    }
    pageRendered.current = true;
  }, [likes])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => { 
    setLikes(likes + 1)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  if (blog.author === user) {
    return (
      <div>
        <div style={blogStyle}>
          <div>
            {blog.title}
            <button onClick={toggleVisibility}>{buttonText.text}</button>
          </div>
          <div style={showWhenVisible}>
            <div>
              {blog.url}
            </div>
            <div>
              likes: {likes}
              <button onClick={addLike}>like</button>
            </div>
            <div>
              {blog.author}
            </div>
            <div>
              <button onClick={removeBlog}>remove</button>
            </div>
          </div>
        </div>
      </div> 
    )
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>{buttonText.text}</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.url}
          </div>
          <div>
            likes: {likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Blog