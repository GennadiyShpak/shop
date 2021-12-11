import { Component, OnInit } from '@angular/core';
import { PRODUCT, TYPE_OF_PRODUCT } from './first-component.model';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {
  isComponentHidden: boolean = true;
  snickers: PRODUCT = {
    name: 'The Snickers',
    description: '../../assets/snickers.png',
    price: 20,
    category: TYPE_OF_PRODUCT.SWEETNESS,
    isAvailable: false,
  }
  
  fruitProduct: PRODUCT[] = [
    {
      name: 'Apple',
      description: '../../assets/apple.png',
      price: 10,
      category: TYPE_OF_PRODUCT.FRUIT,
      isAvailable: true,
    },
    {
      name: 'The banana',
      description: '../../assets/banan.png',
      price: 11,
      category: TYPE_OF_PRODUCT.SWEETNESS,
      isAvailable: true,
    }
  ];

  onClick(): void {
    this.isComponentHidden = !this.isComponentHidden;
  }
}
