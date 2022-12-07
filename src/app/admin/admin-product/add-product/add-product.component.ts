import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/products/services/products.service';
import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { ProductFormActionType } from '../admin-product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  error = null;
  formActionType = ProductFormActionType;

  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  onAdd(formValue: any) {
    this.error = null;
    this.productsService.create(formValue).subscribe({
      next: (productData) => {
        this.notificationService.showNotification({
          message: 'Product added successfully',
          type: 'success',
        });
      },
      error: (err) => {
        console.error(err);
        this.error = err.error;
      },
    });
  }
}
