let SearchUtils = require("../../utils/search");

describe('Facets', () => {
    it('Uses facets to narrow down results', async () => {
      const searchUtils = new SearchUtils(page);
      await searchUtils.gotoSearchPage();

      const facet = await page.waitForSelector('[type="checkbox"]');
      const element = await page.$('[class="ais-Highlight"]')
      const city = await page.evaluate(el => el.textContent, element)
      
      await facet.tap();
      // wait for results to update
      await page.waitForResponse((res) => res.url().includes("queries"));

      // First result should have the facet's text in the body
      const result = await page.$('[class="uppercase tracking-tighter font-medium"]');
      const resultText = await page.evaluate(el => el.textContent, result);
      expect(resultText).toContain(city);
    })
  });
  