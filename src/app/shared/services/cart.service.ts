import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductModel, ProductModel } from '../models/product-model';
import { CartStatistics } from "../models/cart-statistics";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isCartOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isCartOpen$: Observable<boolean> = this.isCartOpen.asObservable();

  private productsInCart$$: BehaviorSubject<CartProductModel[]> = new BehaviorSubject<CartProductModel[]>([]);
  productsInCart$: Observable<CartProductModel[]> = this.productsInCart$$.asObservable();

  private cartListStatistics$$: BehaviorSubject<CartStatistics> = new BehaviorSubject<CartStatistics>({} as CartStatistics);
  cartListStatistics$ = this.cartListStatistics$$.asObservable()

  readonly lastPhoneInCart: number = 1;

  getCartsProducts(): Observable<CartProductModel[]> {
    return this.productsInCart$;
  }

  addProductsToCart(product: ProductModel): void {
    const cartProduct: CartProductModel = {...product,...{phoneInCart: 1}};
    const isProductPresent = this.isPresentInCart(cartProduct);
    const productsInCart = [...this.productsInCart$$.value];
    if (isProductPresent) {
      this.incrementCartCounter(cartProduct);
    } else{
      productsInCart.push(cartProduct);
    }
    this.productsInCart$$.next(productsInCart);
    this.cartListStatistics$$.next(this.getCartStatistic());
  }

  removeProductFromCart(product: CartProductModel): void{
    if (product.phoneInCart === this.lastPhoneInCart) {
      this.filterProductList(product);
    } else {
      this.decrementCartCounter(product);
    }
    this.cartListStatistics$$.next(this.getCartStatistic());
  }

  getTotalSumPerProduct(phone: CartProductModel): number{
      const {price, phoneInCart} = phone;
      return price * phoneInCart;
  }

  setIsCartOpenTrue(): void {
      this.isCartOpen.next(true);
  }

  setIsCartOpenFalse(): void {
      this.isCartOpen.next(false);
  }

  filterProductList(product: CartProductModel): void {
      let cartList = this.productsInCart$$.value
      cartList = cartList.filter(phone => phone.name !== product.name);
      this.productsInCart$$.next(cartList);
      this.cartListStatistics$$.next(this.getCartStatistic());
  }

  clearCart(): void {
    this.productsInCart$$.next([]);
    this.cartListStatistics$$.next(this.getCartStatistic());
  }

  isCartEmpty(): boolean {
    return !Boolean(this.productsInCart$$.value.length)
  }

  private isPresentInCart(product: CartProductModel): boolean {
      return Boolean(this.productsInCart$$.value.some(phone => phone.name === product.name));
  }

  private incrementCartCounter(product: CartProductModel): void {
      const cartList = this.productsInCart$$.value
      const phone = cartList.find(phone => phone.name === product.name);
      if (phone) {
        phone.phoneInCart += 1;
      }
      this.productsInCart$$.next(cartList);

      this.cartListStatistics$$.next(this.getCartStatistic());
  }

  private decrementCartCounter(product: CartProductModel): void {
      const cartList = this.productsInCart$$.value
      const phone = cartList.find(phone => phone.name === product.name);
      if (phone) {
        phone.phoneInCart -= 1;
      }
      this.productsInCart$$.next(cartList);

      this.cartListStatistics$$.next(this.getCartStatistic());
  }

  private getTotalSumInCart (cartList: CartProductModel[]): number {
    return cartList.reduce((acc, product) => {
      const totalProductCost = product.phoneInCart * product.price;
      return acc + totalProductCost
    }, 0)
  }

  private getCountProductInCart (cartList: CartProductModel[]): number {
    return cartList.reduce((acc, product) => {
      return acc + product.phoneInCart
    }, 0)
  }

  private getCartStatistic(): CartStatistics {
    const cartList = this.productsInCart$$.value;

    return {
      totalSum: this.getTotalSumInCart(cartList),
      productInCart: this.getCountProductInCart(cartList),
    }
  }
}
