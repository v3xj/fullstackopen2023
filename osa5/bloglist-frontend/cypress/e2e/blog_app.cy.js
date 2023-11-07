describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "testikayttaja",
      name: "Testi Testinen",
      password: "testi",
      blogs: []
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("username")
    cy.contains("password")
    cy.contains("log in")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("testikayttaja")
      cy.get("#password").type("testi")
      cy.get("#login-button").click()

      cy.contains("logged in as testikayttaja")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("testikayttaja")
      cy.get("#password").type("virheellinen")
      cy.get("#login-button").click()

      cy.get(".error").contains("invalid username or password")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "testikayttaja", password: "testi" })
    })

    it("A blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#blog-title").type("a blog created by cypress")
      cy.get("#blog-author").type("cypress")
      cy.get("#blog-url").type("urlbycypress.test")
      cy.get("#create-blog-button").click()
      cy.contains("a blog created by cypress")
    })

    it("A blog can be liked", function() {
      cy.contains("new blog").click()
      cy.get("#blog-title").type("a blog created by cypress")
      cy.get("#blog-author").type("cypress")
      cy.get("#blog-url").type("urlbycypress.test")
      cy.get("#create-blog-button").click()
      cy.contains("view").click()
      cy.contains("like").click()
      cy.contains("likes: 1")
      cy.contains("like").click()
      cy.contains("likes: 2")
    })
  })
})