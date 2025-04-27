describe("Authentication", () => {
  it("should allow login user with valid credentials", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get(".bm-burger-button").should("exist");
  });

  it("should throw an error when user enters invalid password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("wrong_password");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should(
      "contain",
      "Username and password do not match"
    );
  });

  it("should throw an error when blocked user wants to login", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should("contain", "locked out");
  });

  it("should throw an error when input is empty", () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should("contain", "Username is required");
  });
});
