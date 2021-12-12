import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductModel } from '../../core/models/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() phone: ProductModel = {} as ProductModel;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.cartService.addProductsToCart(this.phone);
    console.log(`This ${this.phone.name} was added to cart`);
  }

}
