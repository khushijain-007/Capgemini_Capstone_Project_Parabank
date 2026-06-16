import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Validate Transfer Applied Correctly', async ({ request }) => {

    const loginData = JSON.parse(fs.readFileSync('test-data/userData.json', 'utf-8'));

    const loginResponse = await request.get(
        `${BASE_URL}/login/${loginData.loginUser.username}/${loginData.loginUser.password}`,
        {
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

    // console.log(JSON.stringify(accounts, null, 2));
    // console.log('Number of Accounts:', accounts.length);    

    expect(accounts.length).toBeGreaterThanOrEqual(2);

    const fromAccountId = accounts[0].id;
    const toAccountId = accounts[1].id;

    const beforeFromBalance = Number(accounts[0].balance);
    const beforeToBalance = Number(accounts[1].balance);

    const transferAmount = 100;

    await request.post(`${BASE_URL}/transfer`, {
            params: {
                fromAccountId,
                toAccountId,
                amount: transferAmount
            }
        });

    const updatedAccountsResponse = await request.get(`${BASE_URL}/customers/${customer.id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        });

    const updatedAccounts = await updatedAccountsResponse.json();
    const afterFromBalance = Number(updatedAccounts[0].balance);
    const afterToBalance = Number(updatedAccounts[1].balance);

    expect(afterFromBalance).toBe(beforeFromBalance - transferAmount);
    expect(afterToBalance).toBe(beforeToBalance + transferAmount);

    console.log('Before From:', beforeFromBalance);
    console.log('After From:', afterFromBalance);

    console.log('Before To:', beforeToBalance);
    console.log('After To:', afterToBalance);

});

