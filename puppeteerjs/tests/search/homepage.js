let SearchUtils = require("../../utils/search");

describe("Homepage Search", () => {
  // it('Should be able to authenticate"', async () => {
  //   // await page.authenticate({
  //   //   username: "admin",
  //   //   password: "Rest1234"
  //   // });
  // });

  it("Searches for bartender and gets a result from home page", async () => {
    const searchUtils = new SearchUtils(page);

    await searchUtils.typeInHomeSearch("Bartender");

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
