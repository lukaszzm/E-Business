describe("Sidebar", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("should open the sidebar menu", () => {
    cy.get(".bm-burger-button").click();

    cy.get(".bm-menu-wrap").should("have.attr", "aria-hidden", "false");
    cy.get(".bm-item-list").should("be.visible");
  });

  it("should log out through the sidebar menu", () => {
    cy.get(".bm-burger-button").click();
    cy.get("#logout_sidebar_link").click();

    cy.url().should("include", "/");
    cy.get('[data-test="login-button"]').should("be.visible");
  });

  it("should reset the application state", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "1");

    cy.get(".bm-burger-button").click();
    cy.get("#reset_sidebar_link").click();

    cy.get(".shopping_cart_badge").should("not.exist");
  });
});
