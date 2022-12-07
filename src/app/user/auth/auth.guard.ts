import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs/operators';

import { User } from '../models/User.model';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        return this.authGuardHandler(user, state.url);
      })
    );
  }

  private authGuardHandler(userData: User | null, path: string) {
    const isAuthenticated = !!userData;

    switch (path) {
      case '/user/my-profile':
        return isAuthenticated ? true : this.router.parseUrl('/user/sign-in');
      case '/user/sign-in':
        return isAuthenticated
          ? this.router.parseUrl('/user/my-profile')
          : true;
      default:
        throw new Error('The url that you provided is invalid!');
    }
  }
}
