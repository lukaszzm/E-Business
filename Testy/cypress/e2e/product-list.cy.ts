describe("Product List", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it("should display list of products", () => {
    cy.get(".inventory_item").should("have.length", 6);
    cy.get(".inventory_item_price").each(($price) => {
      cy.wrap($price).should("contain", "$");
    });
  });

  it("should display list of products sorted by the price", () => {
    cy.get('[data-test="product-sort-container"]').select("lohi");

    cy.get(".inventory_item_price")
      .first()
      .invoke("text")
      .then((text) => {
        const firstPrice = Number.parseFloat(text.replace("$", ""));
        cy.get(".inventory_item_price")
          .last()
          .invoke("text")
          .then((text) => {
            const lastPrice = Number.parseFloat(text.replace("$", ""));
            expect(firstPrice).to.be.at.most(lastPrice);
          });
      });
  });

  it("should allow to sort products by the price (highest first) ", () => {
    cy.get('[data-test="product-sort-container"]').select("hilo");

    cy.get(".inventory_item_price")
      .first()
      .invoke("text")
      .then((text) => {
        const firstPrice = Number.parseFloat(text.replace("$", ""));
        cy.get(".inventory_item_price")
          .last()
          .invoke("text")
          .then((text) => {
            const lastPrice = Number.parseFloat(text.replace("$", ""));
            expect(firstPrice).to.be.at.least(lastPrice);
          });
      });
  });

  it("should allow to sort products by the name (A-Z)", () => {
    cy.get('[data-test="product-sort-container"]').select("az");

    cy.get(".inventory_item_name").then(($items) => {
      const texts = $items.map((i, el) => Cypress.$(el).text()).get();
      const sorted = texts.sort((a, b) => a.localeCompare(b));
      expect(texts).to.deep.equal(sorted);
    });
  });
});
