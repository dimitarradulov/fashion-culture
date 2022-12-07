import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { EditProductComponent } from './admin-product/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'products', component: AdminProductComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/:productId/edit', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
