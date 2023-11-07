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
})