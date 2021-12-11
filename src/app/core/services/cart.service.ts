import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart: ProductModel[] = [];

  getCartsProducts(): ProductModel[] {
    return this.productsInCart
  }

  addProductsToCart(product: ProductModel): void {
    this.productsInCart.push(product)
  }
}
