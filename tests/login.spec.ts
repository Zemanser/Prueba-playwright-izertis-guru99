import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { validUser, invalidUser } from '../data/login.data';

test.describe('Login Suite - Guru99 Bank', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login válido → redirección correcta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(validUser.username, validUser.password);

    await expect(page).toHaveURL(/Managerhomepage/);
  });

  test('Login inválido → error visible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const dialogPromise = page.waitForEvent('dialog');

    await loginPage.login(invalidUser.username, invalidUser.password);

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('User or Password is not valid');
    await dialog.accept();
  });

});
