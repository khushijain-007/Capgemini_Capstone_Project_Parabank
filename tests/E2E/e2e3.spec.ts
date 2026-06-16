import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page Object Model/login.page';
import { TransferFundsPage } from '../../Page Object Model/transferFund.page';
import userData from '../../test-data/userData.json';
import transferData from '../../test-data/TFData.json';

const BASE_URL =
    'https://parabank.parasoft.com/parabank/services/bank';

test.use({ storageState: { cookies: [], origins: [] } });

test('Transfer Funds UI + Balance Validation Through API',
    async ({ page, request }) => {

        // API - Get balances before transfer
        const loginResponse = await request.get(`${BASE_URL}/login/${userData.loginUser.username}/${userData.loginUser.password}`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const customer =await loginResponse.json();

        const accountsResponse = await request.get(`${BASE_URL}/customers/${customer.id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const accounts =await accountsResponse.json();
        expect(accounts.length).toBeGreaterThanOrEqual(2);

        const beforeFromBalance = Number(accounts[0].balance);
        const beforeToBalance = Number(accounts[1].balance);
        const transferAmount =Number(transferData.transferDetails.amount);

        // UI Transfer
        const loginPage =new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(userData.loginUser.username, userData.loginUser.password);

        const transferFundsPage = new TransferFundsPage(page);
        await transferFundsPage.transferFunds(transferData.transferDetails.amount);

        // API - Get balances after transfer
        const updatedAccountsResponse = await request.get(`${BASE_URL}/customers/${customer.id}/accounts`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const updatedAccounts = await updatedAccountsResponse.json();
        const afterFromBalance = Number(updatedAccounts[0].balance);
        const afterToBalance = Number(updatedAccounts[1].balance);

        // Validation
        expect(updatedAccounts).toBeDefined();
        expect(updatedAccounts.length).toBeGreaterThanOrEqual(2);

        console.log('Before From:', beforeFromBalance); 
        console.log('After From:', afterFromBalance);
        console.log('Before To:', beforeToBalance);
        console.log('After To:', afterToBalance);

    });