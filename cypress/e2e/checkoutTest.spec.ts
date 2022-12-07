/// <reference types="cypress" />

describe('Checkout suite', () => {
  const interceptRequests = () => {
    cy.intercept('**/best-selling').as('bestSellingProducts');
    cy.intercept('**/categories').as('categories');
    cy.intercept('**/orders/*').as('userOrders');
    cy.intercept({ url: '**/login', method: 'POST' }).as('login');
    cy.intercept({ url: '**/orders', method: 'POST' }).as('completeOrder');
  };

  it('should make an order and see it in profile', () => {
    interceptRequests();

    cy.loginToApp();

    cy.wait('@login');
    cy.wait('@bestSellingProducts');

    cy.get('[data-cy="nav-shop-categories"]').click();

    cy.wait('@categories');

    cy.get('[data-cy="category-0"] [data-cy="product-1"]')
      .find('[data-cy="single-product-image"]')
      .then((productImgEl) => {
        const productId = productImgEl.attr('data-id');
        cy.intercept(`**/products/${productId}`).as('product');
        cy.wrap(productImgEl).click();
      });

    cy.wait('@product');

    cy.get('[data-cy="product-details-name"]')
      .invoke('text')
      .as('orderedProductName');
    cy.get('[data-cy="product-details-price"]')
      .invoke('text')
      .as('orderedProductPrice');

    cy.get('[data-cy="quantity-left-arrow"]').click();
    cy.get('[data-cy="quantity-amount"]').should('contain', '1');
    cy.get('[data-cy="quantity-right-arrow"]').click();
    cy.get('[data-cy="quantity-amount"]').then((quantitiyEl) => {
      expect(quantitiyEl).to.contain('2');

      const quantityAmount = quantitiyEl.text();

      cy.wrap(quantityAmount).as('orderedProductQuantity');

      cy.get('[data-cy="product-details-addToCart"]').click();

      cy.get('[data-cy="nav-cart-items-amount"]').then((cartItemsEl) => {
        expect(cartItemsEl).to.contain(quantityAmount);
      });
    });

    cy.get('[data-cy="nav-cart"]').click();

    cy.get('[data-cy="checkout-name"]').type('Test name');
    cy.get('[data-cy="checkout-phoneNumber"]').type('0888888888');
    cy.get('[data-cy="checkout-city"]').type('Test city');
    cy.get('[data-cy="checkout-address"]').type('Test address');
    cy.get('[data-cy="checkout-orderBtn"]').click();

    cy.wait('@completeOrder');

    cy.get('[data-cy="checkout-success-heading"]').should(
      'contain',
      'Thank You!'
    );

    cy.get('[data-cy="nav-my-profile"]').click();

    cy.wait('@userOrders');

    cy.get('@orderedProductName').then((orderedProductName) => {
      cy.get('[data-cy="order-0-name"]').should('contain', orderedProductName);
    });

    cy.get('@orderedProductQuantity').then((orderedProductQuantity) => {
      cy.get('[data-cy="order-0-quantity"]').should(
        'contain',
        orderedProductQuantity
      );
    });

    cy.get('@orderedProductPrice').then((orderedProductPrice) => {
      cy.get('[data-cy="order-0-price"]').should(
        'contain',
        orderedProductPrice
      );
    });
  });
});
