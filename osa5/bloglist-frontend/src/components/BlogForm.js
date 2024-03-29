import { useState, useEffect } from "react"

const BlogForm = ({
  createBlog,
}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }


  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={event => setTitle(event.target.value)}
            id="blog-title"
            placeholder="write blog title here"
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={event => setAuthor(event.target.value)}
            id="blog-author"
            placeholder="write blog author here"
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={event => setUrl(event.target.value)}
            id="blog-url"
            placeholder="write blog url here"
          />
        </div>
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
