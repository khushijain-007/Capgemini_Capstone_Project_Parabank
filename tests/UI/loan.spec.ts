import {test, expect} from '@playwright/test';
import { LoanPage } from '../../Page Object Model/loan.page';
import loanData from '../../test-data/loan.json';

test('Request Loan', async ({ page }) => {

    const requestLoanPage = new LoanPage(page);

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await requestLoanPage.requestLoan(loanData.requestLoanDetails.amount, loanData.requestLoanDetails.downPayment);

});