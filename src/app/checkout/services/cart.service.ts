import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart | null>(null);

  constructor() {}

  addToCart(product: CartProduct) {
    let newCart: Cart = {
      products: [],
      totalQuantity: 0,
      totalPrice: 0,
    };

    if (this.cart.value) {
      newCart = this.cart.value;

      const cartProductIndex = newCart.products.findIndex(
        (item) => item.id === product.id
      );

      cartProductIndex !== -1
        ? (newCart.products[cartProductIndex].quantity += product.quantity)
        : newCart.products.push(product);

      newCart.totalQuantity += product.quantity;
      newCart.totalPrice += product.quantity * product.price;
    }

    if (!this.cart.value) {
      newCart.products.push(product);
      newCart.totalQuantity = product.quantity;
      newCart.totalPrice = product.quantity * product.price;
    }

    this.cart.next(newCart);

    this.persistCart(newCart);
  }

  deleteFromCart(productId: string) {
    const cart = <Cart>this.getCart();

    const targetProductIndex = cart.products.findIndex(
      (product) => product.id === productId
    );

    cart.totalQuantity -= cart.products[targetProductIndex].quantity;
    cart.totalPrice -=
      cart.products[targetProductIndex].price *
      cart.products[targetProductIndex].quantity;

    cart.products.splice(targetProductIndex, 1);

    if (!cart.totalQuantity) {
      localStorage.removeItem('cart');

      this.cart.next(null);

      return;
    }

    this.persistCart(cart);

    this.cart.next(cart);
  }

  updateCartProduct(product: CartProduct) {
    const cart = <Cart>this.getCart();
    cart.products = cart.products.map((p) =>
      p.id !== product.id ? p : product
    );
    this.syncCartData(cart);
  }

  loadCart() {
    const cart = JSON.parse(<string>localStorage.getItem('cart'));

    if (!cart) return;

    this.cart.next(cart);
  }

  getCart() {
    return this.cart.getValue();
  }

  resetCart() {
    this.cart.next(null);
    localStorage.removeItem('cart');
  }

  private persistCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private syncCartData(cart: Cart) {
    cart.totalQuantity = cart.products.reduce(
      (acc, val) => acc + val.quantity,
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, val) => acc + val.quantity * val.price,
      0
    );

    this.cart.next(cart);
    this.persistCart(cart);
  }
}

export interface CartProduct {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  quantity: number;
}

export interface Cart {
  products: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
}
