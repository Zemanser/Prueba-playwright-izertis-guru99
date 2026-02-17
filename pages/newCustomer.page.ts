import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { newCustomerLocators } from '../locators/newCustomer.locators';

export class NewCustomerPage extends BasePage {

    readonly newCustomerLink: Locator;
    readonly pageTitle: Locator;
    readonly submitButton: Locator;

    readonly customerNameInput: Locator;
    readonly addressInput: Locator;

    readonly customerNameError: Locator;
    readonly addressError: Locator;

    readonly emailInput: Locator;
    readonly emailError: Locator;

    readonly successMessage: Locator;
    readonly customerIdCell: Locator;


    constructor(page: Page) {
        super(page);

        this.newCustomerLink = page.locator(newCustomerLocators.newCustomerLink);
        this.pageTitle = page.locator(newCustomerLocators.pageTitle);
        this.submitButton = page.locator(newCustomerLocators.submitButton);

        this.customerNameInput = page.locator(newCustomerLocators.customerNameInput);
        this.addressInput = page.locator(newCustomerLocators.addressInput);

        this.customerNameError = page.locator(newCustomerLocators.customerNameError);
        this.addressError = page.locator(newCustomerLocators.addressError);

        this.emailInput = page.locator(newCustomerLocators.emailInput);
        this.emailError = page.locator(newCustomerLocators.emailError);

        this.successMessage = page.locator(newCustomerLocators.successMessage);
        this.customerIdCell = page.locator(newCustomerLocators.customerIdCell);

    }

    async navigateToNewCustomer() {
        await this.newCustomerLink.click();
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    // 🔹 Trigger validación Customer Name (onblur)
    async triggerCustomerNameValidation() {
        await this.customerNameInput.click();
        await this.customerNameInput.blur();
    }

    // 🔹 Trigger validación Address (onblur)
    async triggerAddressValidation() {
        await this.addressInput.click();
        await this.addressInput.blur();
    }
    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async triggerEmailValidation() {
        await this.emailInput.click();
        await this.emailInput.blur();
    }
    async fillNewCustomerForm() {

        await this.customerNameInput.fill('Francisco Gonzalez');

        // 👇 IMPORTANTE: seleccionar género explícitamente
        await this.page.locator('input[value="m"]').check();

        // 👇 MUY IMPORTANTE: DOB en formato yyyy-mm-dd
        await this.page.locator('input[name="dob"]').fill('1975-01-19');

        await this.addressInput.fill('Rio de janeiro 88');
        await this.page.locator('input[name="city"]').fill('Barcelona');
        await this.page.locator('input[name="state"]').fill('Spain');
        await this.page.locator('input[name="pinno"]').fill('009900');
        await this.page.locator('input[name="telephoneno"]').fill('688675566');

        const randomEmail = `fran${Date.now()}@hot.com`;
        await this.page.locator('input[name="emailid"]').fill(randomEmail);

        await this.page.locator('input[name="password"]').fill('Test1234');
    }


}
