describe('Athlete views completed training history', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000/');

    cy.wait(2000); 
cy.get('button').contains('Log In').click();

    cy.url().should('include', '/log-in');
  });

  it('should log in and view training history', () => {

    cy.get('input[placeholder="Email"]').type('user@example.com'); 
    cy.get('input[placeholder="Password"]').type('password'); 
    cy.get('button').contains('Login').click();


    cy.url().should('include', '/home'); 

    cy.get('.graph-container').should('exist');

  });
});
