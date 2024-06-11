
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


describe('it should test Client App', () => {

const url = "<http://localhost:5173>"

  it("Upload single file", () => {
      cy.url(url)
  })

  it("Upload multiple files", () => {
  })


  it("Add item to todos (RDS)", () => {
      cy.viewport(1600, 800)
  })
});