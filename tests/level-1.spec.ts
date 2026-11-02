import { test, expect } from '@playwright/test';
import { GroupOrderPage } from '../pages/GroupOrderPage';

test.describe('Level 1: Viewing Group Pre-Order Participants', () => {

  test('Owner sees all joined participants, their dishes, and individual totals', async ({ page }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('res-1');

    await expect(groupOrderPage.heading).toBeVisible();
    await expect(groupOrderPage.participantCards).toHaveCount(3);

    const ownerCard = await groupOrderPage.getParticipantByName('My Pre-Order');
    await expect(ownerCard).toBeVisible();
    await expect(ownerCard).toContainText('Caesar Salad');

    const guestCard = await groupOrderPage.getParticipantByName('Andrii');
    await expect(guestCard).toBeVisible();
    await expect(guestCard).toContainText('360 грн');
  });

  test('Displays unsubmitted warning and correct total for valid sessions', async ({ page }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('res-1');

    await expect(groupOrderPage.warningBanner).toContainText('1 participant hasn’t submitted');
    await expect(groupOrderPage.totalAmount).toContainText('$540.00');
  });

  test('Displays error message for non-existent group reservation', async ({ page }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('non-existent-id');

    const errorElement = page.locator('.error-state');
    await expect(errorElement).toContainText('Group reservation not found');
  });
});