let SearchUtils = require("../../utils/search");

describe("Autocomplete", () => {
  it("Searches for bart and gets a result", async () => {
    const searchUtils = new SearchUtils(page);
    await searchUtils.typeInHomeSearch("bart");

    const result = await page.waitForXPath(
      '//span[contains(text(), "Bartender")]'
    );
    await result.tap();
    const [button] = await page.$x("//div[text()='Search']");

    await button.tap();
    await page.waitForNavigation();

    await page.waitForSelector('[class="ais-Hits-item"]');
  });
});
