import { Component, OnInit } from '@angular/core';

import { CartService } from '../checkout/services/cart.service';
import { AuthService } from '../user/auth/services/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = false;
  toggleDropdown = false;

  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.checkIfUserIsAdmin();
  }

  onLogout() {
    this.authService.logout(false);
  }
}
