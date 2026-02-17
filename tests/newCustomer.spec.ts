import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NewCustomerPage } from '../pages/newCustomer.page';
import { validUser } from '../data/login.data';

test.describe('New Customer Suite - Guru99 Bank', () => {

    let loginPage: LoginPage;
    let newCustomerPage: NewCustomerPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        newCustomerPage = new NewCustomerPage(page);

        // Login automático
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);

        await expect(page).toHaveURL(/Managerhomepage/);

        // Ir a New Customer
        await newCustomerPage.navigateToNewCustomer();

        await newCustomerPage.takeScreenshot('NC_01_new_customer_page');
    });

    // 1️⃣ Acceso correcto
    test('Acceso correcto al módulo New Customer', async () => {

        await expect(newCustomerPage.pageTitle)
            .toHaveText('Add New Customer');

        await newCustomerPage.takeScreenshot('NC_02_acceso_correcto');
    });

    // 2️⃣ Validación de campos obligatorios
    test('Validación de campos obligatorios', async () => {

        await newCustomerPage.takeScreenshot('NC_03_formulario_vacio');

        // Trigger validación Customer Name (onblur)
        await newCustomerPage.triggerCustomerNameValidation();

        await expect(newCustomerPage.customerNameError)
            .toHaveText(/must not be blank/i);

        // Trigger validación Address (onblur)
        await newCustomerPage.triggerAddressValidation();

        await expect(newCustomerPage.addressError)
            .toHaveText(/must not be blank/i);

        await newCustomerPage.takeScreenshot('NC_04_validacion_obligatorios');
    });
    // 3️⃣ Validación formato email inválido
    test('Validación formato email inválido', async () => {

        // Screenshot inicio
        await newCustomerPage.takeScreenshot('NC_06_email_inicio');

        // Introducimos email inválido
        await newCustomerPage.fillEmail('test123');

        // Forzamos validación
        await newCustomerPage.triggerEmailValidation();

        // Validamos mensaje
        await expect(newCustomerPage.emailError)
            .toContainText('Email-ID is not valid');

        // Screenshot resultado
        await newCustomerPage.takeScreenshot('NC_07_email_invalido');
    });

    // 4️⃣ Creación correcta cliente (Happy Path)
    test('Creación correcta de cliente', async () => {

        // Screenshot inicio formulario
        await newCustomerPage.takeScreenshot('NC_08_inicio_creacion');

        // Rellenamos formulario
        await newCustomerPage.fillNewCustomerForm();

        await newCustomerPage.takeScreenshot('NC_09_formulario_relleno');

        // Enviamos
        await newCustomerPage.clickSubmit();

        // Validamos mensaje éxito
        await expect(newCustomerPage.successMessage)
            .toContainText('Customer Registered Successfully!!!');

        // Validamos que existe ID generado
        await expect(newCustomerPage.customerIdCell)
            .not.toBeEmpty();

        await newCustomerPage.takeScreenshot('NC_10_cliente_creado');
    });


});
