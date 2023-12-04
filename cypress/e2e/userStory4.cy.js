describe("Athlete can create an account and personalize it.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.wait(2000);
    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/sign-up");
  });

  it("Athlete can create an account and personalize it", () => {
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.get('input[placeholder="Full Name"]').type("Daniel Reyes");
    cy.get('input[placeholder="Username"]').type("dfreyesr");

    cy.contains("label", "I accept term and conditions").click();

    cy.get("button").contains("Get started").click();

    cy.url().should("include", "/home");


    cy.wait(500);
    
    cy.contains('.menu-item-name', 'Profile').click();
    cy.wait(500);
    cy.contains('Edit').click();
    cy.wait(500);
    cy.get('.profile-info input[type="text"]').first().clear().type(' Cristiano');
    cy.wait(500);
    cy.contains('Save').click();
    cy.contains('Cristiano').should("exist");



  });
});
