import { test } from '@playwright/test';
import { RegisterPage } from '../../Page Object Model/register.page.ts';
import userData from '../../test-data/userData.json';

test.use({ storageState: { cookies: [], origins: [] } });

test('Register User', async ({ page }) => {

    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register(userData.registerUser);
});