import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../services/products.service';
import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';
import {
  CartProduct,
  CartService,
} from 'src/app/checkout/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productData: Product;
  subscription: Subscription;
  error = null;
  quantity = 1;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.subscription = this.productService
      .getOneProduct(this.route.snapshot.params['productId'])
      .subscribe({
        next: (product) => {
          this.productData = product;
        },
        error: (err) => {
          console.error(err);
          this.error = err.message;
        },
      });
  }

  onAddToCart() {

    const product: CartProduct = {
      id: this.productData.id,
      imagePath: this.productData.imagePath,
      name: this.productData.name,
      price: this.productData.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
