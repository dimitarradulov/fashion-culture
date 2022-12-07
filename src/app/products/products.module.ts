import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductCategoryComponent } from './product-categories/product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SingleProductComponent } from './single-product/single-product.component';

@NgModule({
  declarations: [
    ProductCategoriesComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    SingleProductComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
  exports: [SingleProductComponent],
})
export class ProductsModule {}
