import { ChangeDetectionStrategy, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartProductModel } from 'src/app/shared/models/product-model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy, DoCheck{

  phones!: CartProductModel[];
  isCartOpen: boolean = false;
  cartBtnStatus!: string;
  orderSum!: number;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initServices();
  }

  ngDoCheck(): void {
    this.getProducts();
    this.orderSum = this.getTotalSum(this.phones)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  trackByFn(index: number): number {
    return index;
  }

  onOpenCartClick(): void {
    this.isCartOpen 
    ? this.cartService.setIsCartOpenFalse()
    : this.cartService.setIsCartOpenTrue();
  }
  
  onIncrementPhoneBtn(phone: CartProductModel): void {
    this.cartService.addProductsToCart(phone);
  }

  onRemovePhoneBtn(phone: CartProductModel): void {
    this.cartService.filterProductList(phone);
  }

  onDecrementPhoneBtn(phone: CartProductModel): void {
    this.cartService.removeProductFromCart(phone);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  private getTotalSum(phoneList: CartProductModel[]): number {
    if (!phoneList) {
      return 0;
    }

    return phoneList.map((phone) => this.cartService.getTotalSum(phone)).reduce((sum1, sum2) => sum1 + sum2, 0);
  }

  private initServices(): void {
    this.setIsCartOpen();
  }

  private setIsCartOpen(): void {
    this.cartService.isCartOpen$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      value => {
        this.isCartOpen = value;
        this.setCartStatus();
      }
    )
  }

  private getProducts(): void {
    this.phones = this.cartService.getCartsProducts();
  }

  private setCartStatus(): void {
    this.isCartOpen 
    ? this.cartBtnStatus = 'Close'
    : this.cartBtnStatus = 'Open';
  }
}