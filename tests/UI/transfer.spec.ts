import { test } from '@playwright/test';
import { TransferFundsPage } from '../../Page Object Model/transferFund.page';
import transferData from '../../test-data/TFData.json';

test('Transfer Funds', async ({ page }) => {

    const transferFundsPage = new TransferFundsPage(page);

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await transferFundsPage.transferFunds(transferData.transferDetails.amount);
    await page.locator('//input[@value="Transfer"]').click();
});
