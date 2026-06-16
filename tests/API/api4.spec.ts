import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Request Loan via API', async ({ request }) => {

    const loginData = JSON.parse(fs.readFileSync('test-data/userData.json', 'utf-8'));
    const userName = loginData.loginUser.username;
    const password = loginData.loginUser.password;
    const loginResponse = await request.get(`${BASE_URL}/login/${userName}/${password}`,{
        headers: {
            Accept: 'application/json'
        }
    });

    const customer = await loginResponse.json();
    const customerId = customer.id;
    const accountsResponse = await request.get(`${BASE_URL}/customers/${customerId}/accounts`,{
    headers: {
        Accept: 'application/json'
    }
});

    expect(accountsResponse.ok()).toBeTruthy();
    console.log(accountsResponse.headers());
    const responseText = await accountsResponse.text();
    console.log(responseText);

});