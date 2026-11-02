import { test, expect } from '@playwright/test';
import { GroupOrderPage } from '../pages/GroupOrderPage';

test.describe('Level 3: Participant Management & Sync', () => {

  test('Removing a participant recalculates total sum', async ({ request }) => {
    // API Call for deletion
    const response = await request.delete('/api/group-orders/grp-1/participants/part-3');
    expect(response.status()).toBe(200);
  });

  test('API returns 404 when removing non-existent participant', async ({ request }) => {
    const response = await request.delete('/api/group-orders/grp-1/participants/invalid-id');
    expect(response.status()).toBe(404);
  });

  test('Full E2E Flow: Review -> Remove -> Submit', async ({ page, request }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('res-1');

    await expect(groupOrderPage.participantCards).toHaveCount(3);

    // Remove participant via API
    await request.delete('/api/group-orders/grp-1/participants/part-3');

    await page.reload();
    await expect(groupOrderPage.participantCards).toHaveCount(2);

    await groupOrderPage.submitOrder();
    await expect(page.locator('.success-text')).toContainText('Sent to Restaurant');
  });
});