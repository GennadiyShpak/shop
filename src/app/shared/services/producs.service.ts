import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import {ProductModel} from "../models";

const phonesForSale: ProductModel[] = [
  {
    id: 1,
    name: 'Apple',
    image: '../../../assets/apple.jpg',
    price: 14999,
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Samsung',
    image: '../../../assets/samsung.jpg',
    price: 10499,
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Poco',
    image: '../../../assets/poco.jpg',
    price: 8499,
    isAvailable: false,
  },
  {
    id: 4,
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

  getProducts(): Observable<ProductModel[]> {
    return of(phonesForSale);
  }

  getProduct(productId: number): ProductModel {
    return phonesForSale.find(product => product.id === productId) as ProductModel;
  }

  getProduct$(productId: number): Observable<ProductModel> {
    return of(phonesForSale.find(product => product.id === productId) as ProductModel);
  }

  addProduct(phone: Pick<ProductModel, 'name' | 'image' | 'price' | 'isAvailable'>) {
    const newPhone = {...phone, id: phonesForSale.length + 1}
    phonesForSale.push(newPhone);
  }
}
