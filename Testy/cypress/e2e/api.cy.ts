describe("API", () => {
  it("should handle an incorrect API path", () => {
    cy.request({
      url: "https://www.saucedemo.com/api/nonexistent",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it("should throw an error with logging in with an invalid credentials", () => {
    cy.request({
      method: "POST",
      url: "https://www.saucedemo.com/",
      failOnStatusCode: false,
      form: true,
      body: {
        "user-name": "invalid_user",
        password: "invalid_password",
      },
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it("should fail to view the inventory page without logging in", () => {
    cy.request({
      url: "https://www.saucedemo.com/inventory.html",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it("should fail to view a product that doesn't exist", () => {
    cy.request({
      url: "https://www.saucedemo.com/inventory-item.html?id=999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it("should fail to add a product to the cart that doesn't exist", () => {
    cy.request({
      method: "POST",
      url: "https://www.saucedemo.com/cart.html",
      failOnStatusCode: false,
      body: {
        product_id: "nonexistent_id",
      },
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it("should fail to finalize order with an empty cart", () => {
    cy.request({
      method: "POST",
      url: "https://www.saucedemo.com/checkout-step-one.html",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });

    it("should fail with invalid personal data", () => {
      cy.request({
        method: "POST",
        url: "https://www.saucedemo.com/checkout-step-two.html",
        failOnStatusCode: false,
        body: {
          firstName: "",
          lastName: "",
          postalCode: "",
        },
      }).then((response) => {
        expect(response.status).to.not.eq(200);
      });
    });
  });
});
