import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.getUser();

    if (!user?.getToken()) {
      return next.handle(req);
    }

    const token = <string>user.getToken();

    const modifiedReq = req.clone({
      headers: new HttpHeaders().append('authorization', `Bearer ${token}`),
    });

    return next.handle(modifiedReq);
  }
}
