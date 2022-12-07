import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartProduct } from 'src/app/checkout/services/cart.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpService) {}

  getOrdersProducts() {
    const { id: userId } = JSON.parse(<string>localStorage.getItem('user'));

    return this.http.get(`orders/${userId}`).pipe(
      map((orders: OrderResponseData[]) => {
        return orders.flatMap((order) => order.products);
      })
    );
  }

  create(orderData: {
    orderInfo: OrderInfo;
    products: CartProduct[];
    userId: string;
  }): Observable<OrderResponseData> {
    return this.http.post('orders', orderData);
  }
}

interface OrderResponseData {
  id: string;
  products: CartProduct[];
  userId: string;
  createdAt: Date;
}

interface OrderInfo {
  name: string;
  phoneNumber: number;
  city: string;
  address: string;
}
