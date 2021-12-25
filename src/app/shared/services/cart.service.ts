import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isCartOpen = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this.isCartOpen.asObservable();

  productsInCart: ProductModel[] = [];

  getCartsProducts(): ProductModel[] {
    return this.productsInCart
  }

  addProductsToCart(product: ProductModel): void {
    const isProductPresent = this.isPresentInCart(product)
    if (isProductPresent) {
      this.incrementCartCounter(product)
    } else{
      product.phoneInCart = 1;
      this.productsInCart.push(product)
    }
  }

  setIsCartOpenTrue(): void {
    this.isCartOpen.next(true)
  }

  setIsCartOpenFalse(): void {
    this.isCartOpen.next(false)
  }

  private isPresentInCart(product: ProductModel): boolean {
    return Boolean(this.productsInCart.some(phone => phone.name === product.name))
  }

  private incrementCartCounter(product: ProductModel): void {
    const phone = this.productsInCart.find(phone => phone.name === product.name)
    if (phone?.phoneInCart) {
      phone.phoneInCart += 1
    }
  }
}
