import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductFormActionType } from '../admin-product.model';

import { NotificationService } from 'src/app/shared/notification/services/notification.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: Product;
  productId: string;
  error = null;
  formActionType = ProductFormActionType;

  constructor(
    public loadingService: LoadingService,
    private productsService: ProductsService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.productsService
      .getOneProduct(this.productId)
      .subscribe((productData) => (this.product = productData));
  }

  onEdit(formValue: any) {
    this.error = null;
    this.productsService.edit(this.productId, formValue).subscribe({
      next: () => {
        this.router.navigate(['admin/products'], {
          relativeTo: this.route.parent?.parent,
        });
        this.notificationService.showNotification({
          message: 'Product updated successfully!',
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
