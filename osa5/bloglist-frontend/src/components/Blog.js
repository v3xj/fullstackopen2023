import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = { text: visible ? 'hide' : 'view'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            likes: {blog.likes}
            <button>like</button>
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