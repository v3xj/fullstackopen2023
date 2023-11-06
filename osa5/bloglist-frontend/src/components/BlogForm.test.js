import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> calls createBlog onSubmit with correct data", async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  screen.debug()

  const input_title = screen.getByPlaceholderText("write blog title here")
  const input_author = screen.getByPlaceholderText("write blog author here")
  const input_url = screen.getByPlaceholderText("write blog url here")
  const sendButton = screen.getByText("create")

  await user.type(input_title, "testing a form...")
  await user.type(input_author, "test2")
  await user.type(input_url, "test3")
  screen.debug()
  await user.click(sendButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...")
})