import { test, expect } from '@playwright/test';
import userData from '../../test-data/userData.json';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';

test('Get customer ID via login API', async ({ request }) => {
  
  const userName = userData.loginUser.username;
  const password = userData.loginUser.password;

  console.log(userName);
  console.log(password);
  
  const response = await request.get(`${BASE_URL}/login/${userName}/${password}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  
  expect(response.ok()).toBeTruthy();
  console.log('Status:', response.status());
  const customer = await response.json();
  console.log('Customer:', customer);
});