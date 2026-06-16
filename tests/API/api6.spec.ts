import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Validate Updated Balances Using API', async ({ request }) => {

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

    const accounts = await accountsResponse.json();
    expect(accounts).toBeDefined();
    console.log('Accounts:', accounts);

    for (const account of accounts) {
        expect(account.balance).toBeDefined();
        console.log(
            `Account ${account.id} Balance: ${account.balance}`
        );
    }

});