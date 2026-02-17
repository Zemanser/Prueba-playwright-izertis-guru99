import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(loginLocators.usernameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.resetButton = page.locator(loginLocators.resetButton);
  }
  
  async goto() {
    await this.page.goto('https://demo.guru99.com/V4/');
  }
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
async reset() {
    await this.resetButton.click();
  }
}
