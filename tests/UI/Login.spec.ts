import { test } from '@playwright/test';
import { LoginPage } from '../../Page Object Model/login.page';
import userData from '../../test-data/userData.json';

test.use({ storageState: { cookies: [], origins: [] } });

test('Login User', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
        userData.loginUser.username,
        userData.loginUser.password
    );

    await page.context().storageState({
        path: '.auth/storageState.json'
    });

});