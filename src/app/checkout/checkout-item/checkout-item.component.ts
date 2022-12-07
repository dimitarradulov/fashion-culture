import { Component, Input, OnInit } from '@angular/core';

import { CartProduct, CartService } from '../services/cart.service';

@Component({
  selector: 'checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss'],
})
export class CheckoutItemComponent implements OnInit {
  @Input() product: CartProduct;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  changeProductQuantity(quantity: number) {
    this.cartService.updateCartProduct({
      ...this.product,
      quantity,
    });
  }
}
