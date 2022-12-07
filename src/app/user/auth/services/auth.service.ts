import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, asyncScheduler } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { User } from '../../models/User.model';

export interface AuthResponseData {
  email: string;
  id: string;
  token: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  isUserAdmin = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  signUp(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<AuthResponseData> {
    return this.http
      .post('signup', {
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((userData) => {
          this.handleAuth(userData);
        })
      );
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post('login', {
        email,
        password,
      })
      .pipe(
        tap((userData) => {
          this.handleAuth(userData);
        })
      );
  }

  changePassword(newPassword: string) {
    return this.http.post('reset-password', { newPassword }).pipe(
      tap((userResData) => {
        this.handleAuth(userResData, {
          message: 'Password changed successfully!',
          type: 'success',
        });
      })
    );
  }

  logout(showNotification: boolean) {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/']);

    if (showNotification) {
      this.notificationService.showNotification({
        message: 'Your session has expired. Please sign in again!',
        type: 'danger',
      });
    }
  }

  checkIfUserIsAdmin() {
    if (!this.getUser()) return;

    this.http
      .get('user')
      .pipe(take(1))
      .subscribe((userDetails) => {
        const { isAdmin } = userDetails.userCredentials;

        this.isUserAdmin.next(!!isAdmin);
      });
  }

  autoLogin() {
    const storedUser = JSON.parse(<string>localStorage.getItem('user'));

    if (!storedUser) return;

    const storedUserTokenExpiration = new Date(storedUser._tokenExpiration);

    const user = new User(
      storedUser.email,
      storedUser.id,
      storedUser._token,
      storedUserTokenExpiration,
      storedUser.isAdmin
    );

    if (!user.getToken()) {
      this.logout(true);
      return;
    }

    this.autoLogout(storedUserTokenExpiration.getTime() - new Date().getTime());

    this.user.next(user);
  }

  autoLogout(expirationDuration: number) {
    asyncScheduler.schedule(this.logout.bind(this, true), expirationDuration);
  }

  getUser() {
    return this.user.getValue();
  }

  private persistUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleAuth(
    userData: AuthResponseData,
    notificationOptions: { message: string; type: string } = {
      message: 'Success! Happy Shopping 😊',
      type: 'success',
    }
  ) {
    const { email, id, token, isAdmin } = userData;
    const tokenExpirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const newUser = new User(email, id, token, tokenExpirationDate, isAdmin);

    this.persistUser(newUser);

    this.autoLogout(3600 * 1000);

    this.isUserAdmin.next(isAdmin);

    this.user.next(newUser);

    this.notificationService.showNotification(notificationOptions);
  }
}
