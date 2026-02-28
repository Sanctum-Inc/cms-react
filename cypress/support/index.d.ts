/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    mockApi(): Chainable<void>;
    mockLoginAndVisit(url?: string): Chainable<void>;
  }
}
