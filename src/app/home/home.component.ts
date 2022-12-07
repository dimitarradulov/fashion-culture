import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../shared/models/product.model';
import { ProductsService } from '../products/services/products.service';
import { LoadingService } from '../shared/loading-spinner/services/loading.service';
import { Categories } from '../shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private homeSubscription: Subscription;
  bestSellingProducts: Product[] = [];
  error = null;
  categories = Categories;

  constructor(
    private productsService: ProductsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.homeSubscription = this.productsService
      .getBestSellingProducts()
      .subscribe({
        next: (data) => {
          this.bestSellingProducts = data;
        },
        error: (err) => {
          console.error(err);
          this.error = err.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.homeSubscription.unsubscribe();
  }
}
