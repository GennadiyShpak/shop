import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import {BehaviorSubject, Observable} from "rxjs";

const phonesForSale: ProductModel[] = [
  {
    name: 'Apple',
    image: '../../../assets/apple.jpg',
    price: 14999,
    isAvailable: true,
  },
  {
    name: 'Samsung',
    image: '../../../assets/samsung.jpg',
    price: 10499,
    isAvailable: true,
  },
  {
    name: 'Poco',
    image: '../../../assets/poco.jpg',
    price: 8499,
    isAvailable: false,
  },
  {
    name: 'Xiaomi',
    image: '../../../assets/xiaomi.jpg',
    price: 11999,
    isAvailable: true,
  }
];


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private phonesForSale$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(phonesForSale);

  getProducts(): Observable<ProductModel[]> {
    return this.phonesForSale$;
  }
}
