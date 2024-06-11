// import 'cypress-keycloak';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})


describe('it should test Customer Features', () => {
    // beforeEach(() => {
    //     cy.login({
    //         root: 'http://ci.check-consulting.net:10000',
    //         realm: 'staff-manager-admin',
    //         username: 'mchekini',
    //         password: 'test',
    //         client_id: 'staff-manager-admin-client',
    //         redirect_uri: 'http://check-consulting.net:81',
    //     });
    //     cy.visit("http://check-consulting.net:81");
    // });

    it("Upload single file", () => {
    })

    it("Upload multiple files", () => {
    })


    it("Add item to todos (RDS)", () => {
        cy.viewport(1600, 800)
    })
});