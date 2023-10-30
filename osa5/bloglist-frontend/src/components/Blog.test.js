import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "www.test.com",
    author: "testuser"
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} toggleVisibility={mockHandler}/>)

  screen.debug()

  const element = screen.getByText("Component testing is done with react-testing-library")
  expect(element).toBeDefined()

})

test("renders all content of a blog when viewed", () => {
  const blog= {
    title: "Component testing is done with react-testing-library",
    url: "www.test.com",
    author: "testuser",
    likes: "999"
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} visible={true} />
  )

  const url = screen.getByText("www.test.com")
  expect(url).toBeDefined()

  const author = screen.getByText("testuser")
  expect(author).toBeDefined()

  const likes = screen.getByText("likes: 999")
  expect(likes).toBeDefined()

})

test("clicking the button twice calls event handler twice", async () => {
  const blog= {
    title: "Component testing is done with react-testing-library",
    url: "www.test.com",
    author: "testuser",
    likes: "999"
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText("like")
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})