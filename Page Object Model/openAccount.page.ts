import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {

    readonly page: Page;
    readonly openAccountLink: Locator;
    readonly accountType: Locator;
    readonly openAccountButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.openAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.accountType = page.locator('#type');
        this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });
    }

    async openCheckingAccount() {

        await this.openAccountLink.click();
        await this.accountType.selectOption('1');
        await this.openAccountButton.click();
    }

    async openSavingsAccount() {

        await this.openAccountLink.click();
        await this.accountType.selectOption('0');
        await this.openAccountButton.click();
    }
}