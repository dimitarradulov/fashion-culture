import { Component, OnInit } from '@angular/core';
import { CartService } from './checkout/services/cart.service';

import { NotificationService } from './shared/notification/services/notification.service';
import { AuthService } from './user/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.cartService.loadCart();
  }
}
