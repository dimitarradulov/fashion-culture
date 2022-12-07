import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingService } from '../shared/loading-spinner/services/loading.service';
import { OrdersService } from '../shared/services/orders.service';
import { AuthService } from '../user/auth/services/auth.service';
import { User } from '../user/models/User.model';
import { Cart, CartService } from './services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  error = null;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    public loadingService: LoadingService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const cart = <Cart>this.cartService.getCart();
    const user = <User>this.authService.getUser();

    const newOrder = {
      orderInfo: form.value,
      products: cart.products,
      userId: user.id,
    };

    this.ordersService.create(newOrder).subscribe({
      next: (orderResData) => {
        this.cartService.resetCart();
        this.router.navigate(['checkout/success', orderResData.id]);
      },
      error: (err) => {
        console.error(err);
        this.error = err.error;
      },
    });
  }
}
