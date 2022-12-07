export {};

declare global {
  namespace Cypress {
    interface Chainable {
      loginToApp(): Chainable<void>;
    }
  }
}
