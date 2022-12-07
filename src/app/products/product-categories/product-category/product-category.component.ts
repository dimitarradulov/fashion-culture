import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/product.model';
import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  categoryName: string;
  categoryProducts: Product[];
  categoryProductsSubscription: Subscription;
  error = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['categoryName'];

    this.error = null;
    this.categoryProductsSubscription = this.productsService
      .getCategoryProducts(this.categoryName)
      .subscribe({
        next: (products) => {
          this.categoryProducts = products;
        },
        error: (err) => {
          console.log(err);
          this.error = err.message;
        },
      });
  }

  ngOnDestroy(): void {
    this.categoryProductsSubscription.unsubscribe();
  }
}
