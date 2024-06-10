
describe('Todo App', () => {
  it('Uploads a single file', () => {
    cy.visit('/');

    // Upload a single file
    cy.get('input[type="file"]').eq(0).attachFile('example.txt');

    // Submit the form
    cy.contains('upload').click();

    // Assert that the file was uploaded successfully
    cy.contains('List S3:').should('be.visible');
    cy.contains('example.txt').should('be.visible');
  });

  it('Uploads multiple files', () => {
    cy.visit('/');

    // Upload multiple files
    cy.get('input[type="file"]').eq(1).attachFile(['example1.txt', 'example2.txt']);

    // Submit the form
    cy.contains('upload').click();

    // Assert that the files were uploaded successfully
    cy.contains('List S3:').should('be.visible');
    cy.contains('example1.txt').should('be.visible');
    cy.contains('example2.txt').should('be.visible');
  });

  it('Adds an item to the list', () => {
    cy.visit('/');

    // Type text into the input field
    cy.get('input[type="text"]').type('New todo item');

    // Submit the form
    cy.contains('Submit').click();

    // Assert that the new item was added to the list
    cy.contains('List S3:').should('be.visible');
    cy.contains('New todo item').should('be.visible');
  });
});
