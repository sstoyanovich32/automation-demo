let SearchUtils = require("../../utils/search");

describe("Facets", () => {
  it("Uses facets to narrow down results", async () => {
    const searchUtils = new SearchUtils(page);
    await searchUtils.gotoSearchPage();

    await page.waitForNavigation();
    // Should only display 10 results at a time
    const hits = await page.$$('[class="ais-Hits-item"]');
    expect(hits.length).toEqual(10);

    const firstItem = await page.evaluate((el) => el.textContent, hits[0]);
    const nextButton = await page.waitForSelector('a[href="/jobs?page=2"');
    await nextButton.tap();
    await page.waitForResponse((res) => res.url().includes("queries"));

    const hit = await page.$('[class="ais-Hits-item"]');
    const firstItemSecondPage = await page.evaluate(
      (el) => el.textContent,
      hit
    );
    expect(firstItem).not.toEqual(firstItemSecondPage);
  });
});
