import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { validUser, invalidUser } from '../data/login.data';

test.describe('Login Suite - Guru99 Bank', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // 1️⃣ LOGIN VÁLIDO
test('Login válido → redirección correcta', async ({ page }) => {

  // Rellenamos usuario
  await loginPage.fillUsername(validUser.username);

  // Rellenamos password
  await loginPage.fillPassword(validUser.password);

  // Screenshot con datos introducidos
  await loginPage.takeScreenshot('01_datos_introducidos');

  // Click login
  await loginPage.clickLogin();

  await expect(page).toHaveURL(/Managerhomepage/);

  // Screenshot resultado final
  await loginPage.takeScreenshot('01_resultado_final');
});



  // 2️⃣ LOGIN INVÁLIDO
test('Login inválido → error visible', async ({ page }) => {

  // Rellenamos datos incorrectos
  await loginPage.fillUsername(invalidUser.username);
  await loginPage.fillPassword(invalidUser.password);

  // Screenshot con datos introducidos
  await loginPage.takeScreenshot('02_datos_introducidos');

  // Esperamos el alert antes de hacer click
  const dialogPromise = page.waitForEvent('dialog');

  // Click login
  await loginPage.clickLogin();

  // Capturamos el dialog
  const dialog = await dialogPromise;

  expect(dialog.message()).toContain('User or Password is not valid');

  await dialog.accept(); // MUY IMPORTANTE

  // Screenshot tras cerrar el alert
  await loginPage.takeScreenshot('02_resultado_final');
});

// 3️⃣ LOGIN SIN DATOS
test('Login sin introducir datos → error visible', async ({ page }) => {

  // Screenshot antes de hacer nada (campos vacíos)
  await loginPage.takeScreenshot('03_inicio_vacio');

  const dialogPromise = page.waitForEvent('dialog');

  await loginPage.clickLogin();

  const dialog = await dialogPromise;

  expect(dialog.message()).toContain('User or Password is not valid');

  await dialog.accept();

  await loginPage.takeScreenshot('03_resultado_final');
});

  

});
