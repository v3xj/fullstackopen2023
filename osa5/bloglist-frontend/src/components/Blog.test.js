import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "www.test.com",
    author: "testuser"
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.getByText("Component testing is done with react-testing-library")
  expect(element).toBeDefined()

})