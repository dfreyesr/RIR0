describe("Atlhete can access its own workout plan.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.wait(2000);
    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/sign-up");
  });

  it("Atlhete can access its own workout plan", () => {
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.get('input[placeholder="Full Name"]').type("Daniel Reyes");
    cy.get('input[placeholder="Username"]').type("dfreyesr");

    cy.contains("label", "I accept term and conditions").click();

    cy.get("button").contains("Get started").click();

    cy.url().should("include", "/home");

    cy.get(".graph-container").should("exist");

    cy.wait(500);
    
    cy.contains('.menu-item-name', 'Workouts').click();
    cy.wait(500);
    cy.contains('Bodyweight Training').click();
    cy.contains('A type of strength-training where you use your own weight to provide resistance against gravity').should("exist");



  });
});
