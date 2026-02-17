import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/newCustomer/${name}.png`,
      fullPage: true
    });
  }
}
