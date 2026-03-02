// @ts-check
import { test, expect } from '@playwright/test';

test('search jobs and apply', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const searchInput = page.getByRole('searchbox', { name: 'Search companies, or keywords' });
  await searchInput.fill('javascript');
  await searchInput.press('Enter');

  const jobCards = page.locator('jobs-listing-card');
  // ensure there is at least one job card
  const count = await jobCards.count();
  await expect(count).toBeGreaterThan(0);

  const firstJob = jobCards.first();
  await firstJob.click();

  const applyButton = page.getByRole('button', { name: 'Apply' });
  applyButton.click();

  const applied = page.getByRole('button', { name: 'Applied' });
  await expect(applied).toBeVisible();

});
