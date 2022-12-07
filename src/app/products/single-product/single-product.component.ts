import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import {
  CartProduct,
  CartService,
} from 'src/app/checkout/services/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  @Input() productData: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onAddToCart() {
    const product: CartProduct = {
      id: this.productData.id,
      imagePath: this.productData.imagePath,
      name: this.productData.name,
      price: this.productData.price,
      quantity: 1,
    };

    this.cartService.addToCart(product);
  }
}
