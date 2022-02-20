import { Injectable } from '@angular/core';
import { CartStatistics, ProductModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartListService {

  constructor() { }

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

   getCartStatistic(cartList: ProductModel[]): CartStatistics {
    return {
      totalSum: this.getTotalSumInCart(cartList),
      productInCart: this.getCountProductInCart(cartList),
    }
  }
}
