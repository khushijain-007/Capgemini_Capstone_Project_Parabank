import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../Page Object Model/register.page';
import userData from '../../test-data/userData.json';

const BASE_URL =
  'https://parabank.parasoft.com/parabank/services/bank';

test.use({ storageState: { cookies: [], origins: [] } });

test('Register UI + Validate User Through API', async ({ page, request }) => {

    // UI 
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register(userData.registerUser);

    // API Validation 
    const loginResponse = await request.get(`${BASE_URL}/login/${userData.registerUser.username}/${userData.registerUser.password}`,{
            headers: {
                Accept: 'application/json'
            }
        });

    expect(loginResponse.ok()).toBeTruthy();
    const customer = await loginResponse.json();
    console.log('Customer:', customer);

    // API Assertions
    expect(customer).toBeDefined();
    expect(customer.id).toBeTruthy();

    expect(customer.firstName).toBe(userData.registerUser.firstName);
    expect(customer.lastName).toBe(userData.registerUser.lastName);

});