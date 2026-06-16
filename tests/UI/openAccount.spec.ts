import { test } from '@playwright/test';
import { OpenAccountPage } from '../../Page Object Model/openAccount.page';

test('Open Checking Account', async ({ page }) => {

    await page.goto(
        'https://parabank.parasoft.com/parabank/index.htm'
    );

    const openAccountPage =
        new OpenAccountPage(page);

    await openAccountPage.openCheckingAccount();

});