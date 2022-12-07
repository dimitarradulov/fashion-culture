import { TestBed } from '@angular/core/testing';

import { HttpServiceMock } from 'src/app/testing/http.service.mock';
import { HttpService } from './http.service';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpService, useClass: HttpServiceMock }],
    });
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
