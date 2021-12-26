import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  @Input() phone: ProductModel = {} as ProductModel;
  @Input() isPhoneInCart!: boolean;

  @Output() getPhoneToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  addToCart(phone: ProductModel): void {
    this.getPhoneToCart.emit(phone); 
  }
}
