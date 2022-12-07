import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ProductFormComponent } from './admin-product/product-form/product-form.component';
import { EditProductComponent } from './admin-product/edit-product/edit-product.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';

@NgModule({
  declarations: [
    AdminProductComponent,
    ProductFormComponent,
    EditProductComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    SharedModule,
  ],
})
export class AdminModule {}
