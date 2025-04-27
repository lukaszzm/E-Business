describe("Cart", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("should add a product to the cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get('[data-test="remove-sauce-labs-backpack"]').should(
      "have.text",
      "Remove"
    );
  });

  it("should allow to remove a product from the cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
      "have.text",
      "Add to cart"
    );
  });

  it("should display the cart preview", () => {
    const productName = "Sauce Labs Backpack";
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();

    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", productName);
  });

  it("should allow to remove a product from the cart page", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get(".cart_item").should("not.exist");
    cy.get(".cart_contents_container").should("be.visible");
  });
});
