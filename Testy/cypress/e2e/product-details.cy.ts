describe("Product Details", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("should display the product details", () => {
    const productName = "Sauce Labs Backpack";
    cy.contains(".inventory_item_name", productName).click();

    cy.url().should("include", "/inventory-item.html");
    cy.get(".inventory_details_name").should("contain", productName);
    cy.get(".inventory_details_desc").should("be.visible");
    cy.get(".inventory_details_price").should("be.visible");
    cy.get('[data-test="add-to-cart"]').should("be.visible");
    cy.get('[data-test="back-to-products"]').should("be.visible");
  });

  it("should add the product to the cart", () => {
    const productName = "Sauce Labs Backpack";
    cy.contains(".inventory_item_name", productName).click();
    cy.get('[data-test="add-to-cart"]').click();

    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get('[data-test="remove"]').should("have.text", "Remove");
  });

  it("should remove the product from the cart", () => {
    const productName = "Sauce Labs Backpack";
    cy.contains(".inventory_item_name", productName).click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="remove"]').click();

    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get('[data-test="add-to-cart"]').should("have.text", "Add to cart");
  });
});
