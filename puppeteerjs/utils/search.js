module.exports = class SearchUtils {
  #page;
  constructor(page) {
    this.#page = page;
  }

  async gotoSearchPage() {
    const candidatesTab = await this.#page.waitForXPath(
      '//button[contains(text(), "Candidates")]'
    );
    await candidatesTab.tap();
    const browseJobsButton = await this.#page.waitForXPath(
      '//a[contains(text(), "Browse Jobs")]'
    );
    await browseJobsButton.tap();
  }

  async typeInHomeSearch(input) {
    const searchBar = 'input[placeholder="Job, Restaurant or Keyword Title"]';
    await this.#page.waitForSelector(searchBar);
    await this.#page.type(searchBar, input);

    // Because requests get sent out on each letter, the auto complete options can shift while typing.
    // We'll wait until we are finished typing before proceeding
    await this.#page.waitForResponse(
      (res) =>
        res.url().includes("queries") &&
        JSON.parse(res.request().postData()).requests[0].params.includes(input)
    );
  }
};
