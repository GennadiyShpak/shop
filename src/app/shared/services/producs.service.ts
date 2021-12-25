import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProducsService {

  private phonesForSale: ProductModel[] = [
    {
      name: 'Apple',
      image: '../../../assets/apple.jpg',
      price: 14999,
      isAvailable: true,
      phoneInCart: 0,
    },
    {
      name: 'Samsung',
      image: '../../../assets/samsung.jpg',
      price: 10499,
      isAvailable: true,
      phoneInCart: 0,
    },
    {
      name: 'Poco',
      image: '../../../assets/poco.jpg',
      price: 8499,
      isAvailable: false,
      phoneInCart: 0,
    },
    {
      name: 'Xiaomi',
      image: '../../../assets/xiaomi.jpg',
      price: 11999,
      isAvailable: true,
      phoneInCart: 0,
    }
  ];

  getProducts(): ProductModel[] {
    return this.phonesForSale
  }
}
