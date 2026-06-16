import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('GET Accounts List via API', async ({ request }) => {

    const loginData = JSON.parse(fs.readFileSync('test-data/userData.json', 'utf-8'));
    const loginResponse = await request.get(`${BASE_URL}/login/${loginData.loginUser.username}/${loginData.loginUser.password}`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const customer = await loginResponse.json();
    const accountsResponse = await request.get(`${BASE_URL}/customers/${customer.id}/accounts`, {
        headers: {
            Accept: 'application/json'
        }
    });

    expect(accountsResponse.ok()).toBeTruthy();
    console.log(await accountsResponse.text());

});