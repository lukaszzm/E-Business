describe("Checkout", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
  });

  it("should navigate to the checkout page", () => {
    cy.get('[data-test="checkout"]').click();

    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').should("be.visible");
    cy.get('[data-test="lastName"]').should("be.visible");
    cy.get('[data-test="postalCode"]').should("be.visible");
  });

  it("should validate empty fields in the personal data form", () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should("contain", "First Name is required");
  });

  it("should fill the personal data form correctly", () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Jan");
    cy.get('[data-test="lastName"]').type("Kowalski");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();

    cy.url().should("include", "/checkout-step-two.html");
    cy.get(".summary_info").should("be.visible");
  });

  it("should complete the order process", () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Jan");
    cy.get('[data-test="lastName"]').type("Kowalski");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("be.visible");
    cy.get('[data-test="back-to-products"]').should("be.visible");
  });
});
