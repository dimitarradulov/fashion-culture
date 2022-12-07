import { of } from 'rxjs';

import { ProductsService } from '../products/services/products.service';
import { Product } from '../shared/models/product.model';

export class ProductsServiceMock implements Partial<ProductsService> {
  getBestSellingProducts() {
    return of([
      new Product(
        '123asd',
        'Blue Jacket',
        'Lorem Ipsum',
        'https://images.unsplash.com/photo-1518713333137-b1a58a9356a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        50,
        new Date()
      ),
    ]);
  }

  getCategoryProducts() {
    return of([
      new Product(
        '123asd',
        'Blue Jacket',
        'Lorem Ipsum',
        'https://images.unsplash.com/photo-1518713333137-b1a58a9356a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        50,
        new Date()
      ),
    ]);
  }

  getFourProductsFromEachCategory() {
    return of([
      {
        name: 'test',
        products: [
          new Product(
            '123asd',
            'Blue Jacket',
            'Lorem Ipsum',
            'https://images.unsplash.com/photo-1518713333137-b1a58a9356a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            50,
            new Date()
          ),
        ],
      },
    ]);
  }

  getOneProduct(productId: string) {
    return of([
      new Product(
        '123asd',
        'Blue Jacket',
        'Lorem Ipsum',
        'https://images.unsplash.com/photo-1518713333137-b1a58a9356a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        50,
        new Date()
      ),
    ]);
  }
}
