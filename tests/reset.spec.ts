import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Reset Suite - Guru99 Bank', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // 1️⃣ Reset limpia usuario y contraseña
  test('Reset limpia usuario y contraseña', async () => {

    await loginPage.usernameInput.fill('usuarioTest');
    await loginPage.passwordInput.fill('passwordTest');

    // Screenshot con datos rellenados
    await loginPage.takeScreenshot('reset_01_con_datos');

    await loginPage.reset();

    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();

    // Screenshot resultado
    await loginPage.takeScreenshot('reset_01_resultado');
  });


  // 2️⃣ Reset limpia solo usuario rellenado
  test('Reset limpia solo usuario rellenado', async () => {

    await loginPage.usernameInput.fill('usuarioTest');

    await loginPage.takeScreenshot('reset_02_con_usuario');

    await loginPage.reset();

    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();

    await loginPage.takeScreenshot('reset_02_resultado');
  });


  // 3️⃣ Reset limpia solo contraseña rellenada
  test('Reset limpia solo contraseña rellenada', async () => {

    await loginPage.passwordInput.fill('passwordTest');

    await loginPage.takeScreenshot('reset_03_con_password');

    await loginPage.reset();

    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();

    await loginPage.takeScreenshot('reset_03_resultado');
  });

});
