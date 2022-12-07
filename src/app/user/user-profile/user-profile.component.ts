import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CartProduct } from 'src/app/checkout/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProducts: CartProduct[] = [];
  subscription: Subscription;
  showNewPasswordForm = false;
  isResetPasswordLoading = false;
  isOrdersLoading = false;
  error = null;

  constructor(
    private ordersService: OrdersService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isOrdersLoading = true;
    this.subscription = this.ordersService
      .getOrdersProducts()
      .subscribe((products) => {
        this.isOrdersLoading = false;
        this.userProducts = products;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const { newPassword } = form.value;

    this.error = null;
    this.isResetPasswordLoading = true;

    this.authService.changePassword(newPassword).subscribe({
      next: (data) => {
        this.isResetPasswordLoading = false;
        this.showNewPasswordForm = false;
      },
      error: (err) => {
        this.isResetPasswordLoading = false;
        console.error(err);
        this.error = Object.keys(err.error).length ? err.error : err.message;
      },
    });
  }
}
