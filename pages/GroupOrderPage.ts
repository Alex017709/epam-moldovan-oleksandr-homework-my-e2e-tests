import { Page, Locator, expect } from '@playwright/test';

export class GroupOrderPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly warningBanner: Locator;
  readonly submitButton: Locator;
  readonly participantCards: Locator;
  readonly emptyState: Locator;
  readonly totalAmount: Locator;
  readonly confirmModalSubmitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.warningBanner = page.locator('.warning-banner');
    this.submitButton = page.getByRole('button', { name: /Submit Pre-Order|Підтвердити та відправити/i });
    this.participantCards = page.locator('.participant-card');
    this.emptyState = page.locator('.empty-state');
    this.totalAmount = page.locator('.total-amount');
    this.confirmModalSubmitBtn = page.locator('.modal-content button.btn-submit');
  }

  async navigateTo(reservationId: string) {
    await this.page.goto(`/group-order/${reservationId}`);
  }

  getParticipantByName(name: string): Locator {
    return this.participantCards.filter({ hasText: name });
  }

  async submitOrder() {
    await this.submitButton.click();
    if (await this.confirmModalSubmitBtn.isVisible()) {
      await this.confirmModalSubmitBtn.click();
    }
  }
}