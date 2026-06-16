import {Page, Locator } from '@playwright/test';

export class LoanPage {
    readonly page: Page;
    readonly requestLoanLink: Locator;
    readonly amountTextbox: Locator;
    readonly downPaymentTextbox: Locator;
    readonly applyNowButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.requestLoanLink = page.locator("(//*[text()='Request Loan'])[1]");
        this.amountTextbox = page.locator('#amount');
        this.downPaymentTextbox = page.locator('#downPayment');
        this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    }

    async requestLoan(amount: string, downPayment: string) {
        await this.requestLoanLink.click();
        await this.amountTextbox.fill(amount);
        await this.downPaymentTextbox.fill(downPayment);
        await this.applyNowButton.click();
    }
}