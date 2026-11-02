import { Page, Locator } from '@playwright/test';

export class WaiterPage {
  readonly page: Page;
  readonly orderCard: Locator;
  readonly orderStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderCard = page.locator('.waiter-order-card');
    this.orderStatus = page.locator('.order-status');
  }

  async navigateToOrders() {
    await this.page.goto('/waiter/orders');
  }
}