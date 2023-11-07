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

  describe("Login",function() {
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
})