import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Validate Account Type and Details in API', async ({ request }) => {

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

    const accounts = await accountsResponse.json();
    const account = accounts[0];
    expect(account.id).toBeTruthy();
    expect(account.balance).toBeDefined();

    console.log('Account ID:', account.id);
    console.log('Balance:', account.balance);
    console.log('Details:', account);
});