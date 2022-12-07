import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'https://us-central1-ecom-bosch.cloudfunctions.net/api/';

  constructor(private http: HttpClient) {}

  get(path: string) {
    return this.http.get<any>(`${this.baseUrl}${path}`).pipe(
      catchError((errorRes) => {
        let errorMsg = 'An unknown error occured';

        if (!errorRes.error.error) return throwError(() => new Error(errorMsg));

        errorMsg = errorRes.error.error;

        return throwError(() => new Error(errorMsg));
      })
    );
  }

  post(path: string, body: {}) {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  put(path: string, body: {}) {
    return this.http.put<any>(`${this.baseUrl}${path}`, body);
  }

  delete(path: string) {
    return this.http.delete<any>(`${this.baseUrl}${path}`);
  }
}
