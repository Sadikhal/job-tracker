import { test, expect } from '@playwright/test';

test('Landing page loads and has correct branding', async ({ page }) => {
  await page.goto('/');

  
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toContainText('TRACK YOUR');
  await expect(heading).toContainText('CAREER');

  const cta = page.getByRole('link', { name: /Get Started/i });
  await expect(cta).toBeVisible();
});

test('Sign In page is accessible', async ({ page }) => {
  await page.goto('/sign-in');
  
  const submitButton = page.locator('button[type="submit"]');
  
  await expect(submitButton).toBeVisible();
});
