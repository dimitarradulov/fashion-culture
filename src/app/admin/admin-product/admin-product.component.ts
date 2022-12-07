import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

import { ProductsService } from 'src/app/products/services/products.service';
import { LoadingService } from 'src/app/shared/loading-spinner/services/loading.service';
import { Product } from 'src/app/shared/models/product.model';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  products: Product[] = [];
  subscription: Subscription;
  error = null;

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.error = null;

    this.subscription = this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;

        this.dtTrigger.next(this.dtOptions);
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  onDelete(modal: any, productId: string) {
    this.error = null;

    this.modalService.open(modal).result.then(
      (result) => {
        if (result)
          this.productsService.delete(productId).subscribe({
            next: () => {
              this.products = this.products.filter(
                (product) => product.id !== productId
              );

              this.rerenderTable();

              this.notificationService.showNotification({
                message: 'Product deleted successfully!',
                type: 'success',
              });
            },
            error: (err) => {
              console.error(err);
              this.error = err.error;
            },
          });
      },
      (reason) => {
        return null;
      }
    );
  }

  private rerenderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.dtTrigger.next(this.dtOptions);
    });
  }
}
