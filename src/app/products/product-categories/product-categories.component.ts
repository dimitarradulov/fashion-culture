import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';
import { Categories, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit, OnDestroy {
  categories: Categories[];
  categoriesSubscription: Subscription;
  error = null;

  constructor(
    private productsService: ProductsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.categoriesSubscription = this.productsService
      .getFourProductsFromEachCategory()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (err) => {
          console.error(err);
          this.error = err.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
