import { test, expect } from '@playwright/test';
import { runPostmanCollection } from '../../newman-runner';

test.beforeAll(async () => {
  await runPostmanCollection();
});

test('Sample UI test after Postman', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});