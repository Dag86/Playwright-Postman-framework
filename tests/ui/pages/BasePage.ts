// File: tests/ui/pages/BasePage.ts

import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(selector: string) {
    await this.getLocator(selector).click();
  }

  async fill(selector: string, value: string) {
    await this.getLocator(selector).fill(value);
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }
}
