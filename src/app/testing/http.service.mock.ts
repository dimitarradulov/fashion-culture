import { Observable, of } from 'rxjs';
import { HttpService } from '../shared/services/http.service';

export class HttpServiceMock implements Partial<HttpService> {
  get(): Observable<any> {
    return of();
  }

  post(): Observable<any> {
    return of();
  }
}
