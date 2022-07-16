describe("Autocomplete", () => {
  it("Searches using autocomplete", () => {
    cy.visit("https://restaurantinfo.com");

    cy.get("#title").type("Bar");
    cy.get('[aria-labelledby="autosuggest"]').should("contain", "Bartender");
    cy.get('[data-section-name="default"').contains("Bartender").click();
    cy.get(".bg-green-ri").contains("Search").click();

    cy.get(".ais-Hits-item");
  });
});
