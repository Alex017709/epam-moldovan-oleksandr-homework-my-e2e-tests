import { test, expect } from '@playwright/test';
import { GroupOrderPage } from '../pages/GroupOrderPage';
import { WaiterPage } from '../pages/WaiterPage';

test.describe('Level 2: Consolidation & Pre-Order Submission', () => {

  test('Owner submits consolidated pre-order successfully', async ({ page }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('res-1');

    await expect(groupOrderPage.submitButton).toBeEnabled();
    await groupOrderPage.submitOrder();

    await expect(page.locator('.success-text')).toContainText('Sent to Restaurant');
    await expect(groupOrderPage.submitButton).toBeHidden();
  });

  test('Submit button is disabled when no participant has submitted a cart', async ({ page }) => {
    const groupOrderPage = new GroupOrderPage(page);
    await groupOrderPage.navigateTo('empty-group-id');

    await expect(groupOrderPage.submitButton).toBeDisabled();
  });

  test('Waiter can view submitted order with consolidated dishes', async ({ page }) => {
    const waiterPage = new WaiterPage(page);
    await waiterPage.navigateToOrders();

    await expect(waiterPage.orderCard.first()).toBeVisible();
    await expect(waiterPage.orderStatus.first()).toContainText('SubmittedByCustomer');
  });
});