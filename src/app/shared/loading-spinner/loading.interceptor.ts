import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoadingService } from './services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requestsInProgress: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestsInProgress.push(req);

    this.loadingService.isLoading.next(true);

    return new Observable((observer) => {
      const nextHandlerSub = next.handle(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        error: (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          this.removeRequest(req);
          observer.complete();
        },
      });

      return () => {
        this.removeRequest(req);
        nextHandlerSub.unsubscribe();
      };
    });
  }

  private removeRequest(req: HttpRequest<any>) {
    const reqIndex = this.requestsInProgress.indexOf(req);

    if (reqIndex >= 0) {
      this.requestsInProgress.splice(reqIndex, 1);
    }

    this.loadingService.isLoading.next(this.requestsInProgress.length > 0);
  }
}
