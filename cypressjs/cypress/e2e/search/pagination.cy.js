describe("Pagination", () => {
  it("Search Pagination works", () => {
    cy.intercept("**queries**").as("refineResults");
    cy.visit("https://restaurantinfo.com");
    cy.get("button").contains("Candidates").debug().click();

    cy.get(".links").contains("Browse Jobs").click();

    cy.get(".ais-Hits-item")
      .should("have.length", 10)
      .first()
      .invoke("text")
      .then((text) => {
        cy.get("a[href='/jobs?page=2']").contains("Next").click();
        cy.get(".ais-Hits-item").contains(text).should("not.exist");
      });
  });
});
