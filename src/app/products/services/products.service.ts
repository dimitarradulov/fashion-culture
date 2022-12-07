import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/models/product.model';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpService: HttpService) {}

  getAll(): Observable<Product[]> {
    return this.httpService.get('products/all');
  }

  getBestSellingProducts(): Observable<Product[]> {
    return this.httpService.get('products/best-selling');
  }

  getFourProductsFromEachCategory(): Observable<Categories[]> {
    return this.httpService.get(`products/categories`).pipe(
      map((categories) => {
        return Object.entries(categories).map(
          ([categoryName, products]: any[]) => {
            return {
              name: categoryName,
              products: products.slice(0, 4),
            };
          }
        );
      })
    );
  }

  getCategoryProducts(category: string): Observable<Product[]> {
    return this.httpService.get(`products/categories/${category}`);
  }

  getOneProduct(productId: string) {
    return this.httpService.get(`products/${productId}`);
  }

  create(product: Product) {
    return this.httpService.post('products', product);
  }

  edit(productId: string, editedProduct: Product) {
    return this.httpService.put(`products/${productId}/edit`, editedProduct);
  }

  delete(productId: string) {
    return this.httpService.delete(`products/${productId}`);
  }
}

export interface Categories {
  name: string;
  products: Product[];
}
