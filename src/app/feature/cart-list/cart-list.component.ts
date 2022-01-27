import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import { CartProductModel } from 'src/app/shared/models/product-model';
import { CartService } from 'src/app/shared/services/cart.service';
import {CartStatistics} from "../../shared/models/cart-statistics";
import {CartListSelectEnum} from "../../shared/models/ng-select-types";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {

  phones!: CartProductModel[];
  isCartOpen: boolean = false;
  cartBtnStatus!: string;
  orderSum$!: Observable<CartStatistics>;
  isAsc: boolean = false;
  sortingSelectList: CartListSelectEnum[] = [CartListSelectEnum.phoneInCart, CartListSelectEnum.name, CartListSelectEnum.price];
  selectValue!: CartListSelectEnum;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initServices();
    this.getProducts();
    this.orderSum$ = this.cartService.cartListStatistics$;
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

  onCheckboxHandle(): void {
    this.isAsc = !this.isAsc;
  }

  changeFn(value: CartListSelectEnum): void {
    this.selectValue = value;
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
    this.cartService.getCartsProducts().subscribe((cartList) => {
      this.phones = cartList
    });
  }

  private setCartStatus(): void {
    this.isCartOpen
    ? this.cartBtnStatus = 'Close'
    : this.cartBtnStatus = 'Open';
  }
}
