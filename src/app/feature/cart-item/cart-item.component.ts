import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { CartProductModel } from 'src/app/shared/models/product-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements DoCheck {
  @Input() phone!: CartProductModel;
  @Input() isPhoneInCart!: boolean;

  @Output() incrementPhoneInCart: EventEmitter<CartProductModel> = new EventEmitter<CartProductModel>();
  @Output() decrementPhoneInCart: EventEmitter<CartProductModel> = new EventEmitter<CartProductModel>();
  @Output() removePhoneFromCart: EventEmitter<CartProductModel> = new EventEmitter<CartProductModel>();
  
  totalCount!: number;

  ngDoCheck(): void {
    this.totalCount = this.getTotalCount(this.phone);
  }

  
  incrementPhone(phone: CartProductModel): void {
    this.incrementPhoneInCart.emit(phone);
  }

  decrementPhone(phone: CartProductModel): void {
      this.decrementPhoneInCart.emit(phone);
  }

  removeFromCart(phone: CartProductModel): void {
    this.removePhoneFromCart.emit(phone);
  }

  private getTotalCount(phone: CartProductModel): number{
      const {price, phoneInCart} = phone;
      return price*phoneInCart;
  }
}
