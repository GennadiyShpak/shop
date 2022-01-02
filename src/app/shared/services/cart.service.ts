import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductModel, ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isCartOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isCartOpen$: Observable<boolean> = this.isCartOpen.asObservable();

  private productsInCart: CartProductModel[] = [];
  readonly lastPhoneInCart: number = 1;

  getCartsProducts(): CartProductModel[] {
    return this.productsInCart;
  }

  addProductsToCart(product: ProductModel): void {
    const cartProduct: CartProductModel = {...product,...{phoneInCart: 1}};
    const isProductPresent = this.isPresentInCart(cartProduct);
    if (isProductPresent) {
      this.incrementCartCounter(cartProduct);
    } else{
      this.productsInCart.push(cartProduct);
    }
  }

  removeProductFromCart(product: CartProductModel): void{
    if (product.phoneInCart === this.lastPhoneInCart) {
      this.filterProductList(product);
    } else {
      this.decrementCartCounter(product);
    }
  }

  getTotalSum(phone: CartProductModel): number{
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
      this.productsInCart = this.productsInCart.filter(phone => phone.name !== product.name);
  }

  clearCart(): void {
    this.productsInCart = [];
  }

  private isPresentInCart(product: CartProductModel): boolean {
      return Boolean(this.productsInCart.some(phone => phone.name === product.name));
  }

  private incrementCartCounter(product: CartProductModel): void {
      const phone = this.productsInCart.find(phone => phone.name === product.name);
      if (phone) {
        phone.phoneInCart += 1;
      }
  }

  private decrementCartCounter(product: CartProductModel): void {
      const phone = this.productsInCart.find(phone => phone.name === product.name);
      if (phone) {
        phone.phoneInCart -= 1;
      }
  }
}
