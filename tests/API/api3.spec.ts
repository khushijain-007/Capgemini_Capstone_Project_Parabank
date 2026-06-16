import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Validate New Account Exists in API', async ({ request }) => {

    const loginData = JSON.parse(fs.readFileSync('test-data/userData.json', 'utf-8'));
    const loginResponse = await request.get(`${BASE_URL}/login/${loginData.loginUser.username}/${loginData.loginUser.password}`,
        {
            headers: {
                Accept: 'application/json'
            }
        });

    const customer = await loginResponse.json();
    const accountsResponse = await request.get(
        `${BASE_URL}/customers/${customer.id}/accounts`,
        {
            headers: {
                Accept: 'application/json'
            }
        });

    const accounts = await accountsResponse.json();
    console.log(JSON.stringify(accounts, null, 2));

    console.log(typeof accounts);
    console.log(Array.isArray(accounts));
    console.log(accounts);

    expect(accounts?.length).toBeGreaterThanOrEqual(1);
    console.log('Accounts Found:', accounts.length);

});