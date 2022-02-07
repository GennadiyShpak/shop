import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Router} from "@angular/router";

import { ProductModel } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import {CartListSelectEnum, CartStatistics, RouteConfig} from "../../shared/models";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {

  phones!: ProductModel[];
  cartBtnStatus!: string;
  orderSum$!: Observable<CartStatistics>;
  isAsc: boolean = false;
  sortingSelectList: CartListSelectEnum[] = [CartListSelectEnum.phoneInCart, CartListSelectEnum.name, CartListSelectEnum.price];
  selectValue!: CartListSelectEnum;
  isDetailView!: boolean;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  onIncrementPhoneBtn(phone: ProductModel): void {
    this.cartService.addProductsToCart(phone);
  }

  onRemovePhoneBtn(phone: ProductModel): void {
    this.cartService.filterProductList(phone);
  }

  onDecrementPhoneBtn(phone: ProductModel): void {
    this.cartService.removeProductFromCart(phone);
  }

  onOpenProduct(phone: ProductModel):void {
    this.isDetailView = true;
    const link = [this.router.url, phone.id];
    this.router.navigate(link)
  }

  onOpenOrder(): void {
    const link = ['/', RouteConfig.order];
    this.router.navigate(link)
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

  private getProducts(): void {
    this.cartService.getCartsProducts().subscribe((cartList) => {
      this.phones = cartList
    });
  }
}
