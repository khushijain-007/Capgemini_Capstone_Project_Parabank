import { Page, Locator } from '@playwright/test';
export class RegisterPage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly ssn: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.registerLink = page.getByRole('link', { name: 'Register' });

        this.firstName = page.locator('#customer\\.firstName');
        this.lastName = page.locator('#customer\\.lastName');
        this.street = page.locator('#customer\\.address\\.street');
        this.city = page.locator('#customer\\.address\\.city');
        this.state = page.locator('#customer\\.address\\.state');
        this.zipCode = page.locator('#customer\\.address\\.zipCode');
        this.phoneNumber = page.locator('#customer\\.phoneNumber');
        this.ssn = page.locator('#customer\\.ssn');
        this.username = page.locator('#customer\\.username');
        this.password = page.locator('#customer\\.password');
        this.confirmPassword = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    async navigate() {
        await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
    }

    async register(user: any) {

        await this.registerLink.click();
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.street.fill(user.street);
        await this.city.fill(user.city);
        await this.state.fill(user.state);
        await this.zipCode.fill(user.zipCode);
        await this.phoneNumber.fill(user.phoneNumber);
        await this.ssn.fill(user.ssn);
        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.confirmPassword.fill(user.password);
        await this.registerButton.click();
    }
}