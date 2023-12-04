describe("Athlete has access to app to register its metrics.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.wait(2000);
    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/sign-up");
  });

  it("Athlete visualizes it's evolution through time", () => {

    cy.url().should("include", "/home");

    cy.get(".graph-container").should("exist");
  });
});
