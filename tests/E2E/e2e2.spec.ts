import { test } from '@playwright/test';
import { LoginPage } from '../../Page Object Model/login.page';
import userData from '../../test-data/userData.json';

test.use({ storageState: { cookies: [], origins: [] } });

test('Debug Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.login(userData.loginUser.username, userData.loginUser.password);
    await page.waitForTimeout(3000);

    console.log('URL:', page.url());
    const bodyText = await page.locator('body').textContent();
    console.log(bodyText);
});
