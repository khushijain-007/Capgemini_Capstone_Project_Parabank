import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
    readonly page: Page;
    readonly transferFundsLink: Locator;
    readonly amountTextbox: Locator;
    readonly fromAccountDropdown: Locator;
    readonly toAccountDropdown: Locator;
    readonly transferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsLink = page.locator("(//*[text()='Transfer Funds'])[1]");
        this.amountTextbox = page.locator('#amount');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.toAccountDropdown = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
    }

    async transferFunds(amount: string)
    {
        await this.transferFundsLink.click();
        await this.amountTextbox.fill(amount);
        // await this.fromAccountDropdown.selectOption(fromAccount);
        // await this.toAccountDropdown.selectOption(toAccount);
        await this.transferButton.click();
    }
}