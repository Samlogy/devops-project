Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const url = "<http://localhost:5173>"

describe('it should test Client App', () => {
    it("Upload single file", () => {
        // cy.visit(url)
    })

    it("Upload multiple files", () => {
    })


    it("Add item to todos (RDS)", () => {
        cy.viewport(1600, 800)
    })
});