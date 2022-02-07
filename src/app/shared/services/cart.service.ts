import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { CartStatistics } from "../models/cart-statistics";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart$$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  productsInCart$: Observable<ProductModel[]> = this.productsInCart$$.asObservable();

  private cartListStatistics$$: BehaviorSubject<CartStatistics> = new BehaviorSubject<CartStatistics>({} as CartStatistics);
  cartListStatistics$ = this.cartListStatistics$$.asObservable()

  readonly lastPhoneInCart: number = 1;

  getCartsProducts(): Observable<ProductModel[]> {
    return this.productsInCart$;
  }

  addProductsToCart(product: ProductModel): void {
    const cartProduct: ProductModel = {...product,...{phoneInCart: 1}};
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

  removeProductFromCart(product: ProductModel): void{
    if (product.phoneInCart === this.lastPhoneInCart) {
      this.filterProductList(product);
    } else {
      this.decrementCartCounter(product);
    }
    this.cartListStatistics$$.next(this.getCartStatistic());
  }

  getTotalSumPerProduct(phone: ProductModel): number{
      const {price, phoneInCart} = phone;
      return phoneInCart? price * phoneInCart: 0;
  }

  filterProductList(product: ProductModel): void {
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

  private isPresentInCart(product: ProductModel): boolean {
      return Boolean(this.productsInCart$$.value.some(phone => phone.name === product.name));
  }

  private incrementCartCounter(product: ProductModel): void {
      const cartList = this.productsInCart$$.value
      const phone = cartList.find(phone => phone.name === product.name);
      if (phone?.phoneInCart) {
        phone.phoneInCart += 1;
      }
      this.productsInCart$$.next(cartList);

      this.cartListStatistics$$.next(this.getCartStatistic());
  }

  private decrementCartCounter(product: ProductModel): void {
      const cartList = this.productsInCart$$.value
      const phone = cartList.find(phone => phone.name === product.name);
      if (phone?.phoneInCart) {
        phone.phoneInCart -= 1;
      }
      this.productsInCart$$.next(cartList);

      this.cartListStatistics$$.next(this.getCartStatistic());
  }

  private getTotalSumInCart (cartList: ProductModel[]): number {
    return cartList.reduce((acc, product) => {
      if(product.phoneInCart){
        const totalProductCost = product.phoneInCart * product.price;
        return acc + totalProductCost
      }
      return 0
    }, 0)
  }

  private getCountProductInCart (cartList: ProductModel[]): number {
    return cartList.reduce((acc, product) => {
      return product.phoneInCart? acc + product.phoneInCart : 0
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
