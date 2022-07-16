describe("Facets", () => {
  it("Clicks on a facet and narrows down results", () => {
    cy.intercept("**queries**").as("refineResults");
    cy.visit("https://restaurantinfo.com");
    cy.get("button").contains("Candidates").debug().click();

    cy.get(".links").contains("Browse Jobs").click();

    cy.get(".ais-Highlight")
      .first()
      .invoke("text")
      .then((text) => {
        cy.get(`input[value="${text}"]`).check();
        cy.wait("@refineResults");
        cy.get("p[class='uppercase tracking-tighter font-medium'").contains(
          text
        );
      });
  });
});
