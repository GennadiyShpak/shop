import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

import { ProductModel } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import {CartListSelectEnum, CartStatistics, RouteConfig} from "../../shared/models";
import { CartObservableService } from 'src/app/core/services/cart-observable.service';
import { CartListService } from './cart-list.service';
import { take } from 'lodash';
import { AppSettingService } from 'src/app/core/services/app-settings.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {

  phones!: ProductModel[];
  cartBtnStatus!: string;
  orderSum!: CartStatistics;
  isAsc: boolean = false;
  sortingSelectList: CartListSelectEnum[] = [CartListSelectEnum.phoneInCart, CartListSelectEnum.name, CartListSelectEnum.price];
  selectValue!: CartListSelectEnum;
  isDetailView!: boolean;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cartObservableService: CartObservableService,
    private cartListService: CartListService,
    private appSettingService: AppSettingService
  ) { }

  ngOnInit(): void {
    this.getProductList()
    this.appSettingService.getSettings().subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  trackByFn(index: number): number {
    return index;
  }

  onRemovePhoneBtn(phone: ProductModel): void {
    this.cartService.filterProductList(phone);
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
    this.cartObservableService.clearCart().subscribe({
      complete: () => {
      this.router.navigate([RouteConfig.productsPage])
    }})
  }

  onCheckboxHandle(): void {
    this.isAsc = !this.isAsc;
  }

  changeFn(value: CartListSelectEnum): void {
    this.selectValue = value;
  }
  
  private getProductList() {
    const observer = {
      next: (productList: ProductModel[]) => {
        this.phones = productList
        this.orderSum = this.cartListService.getCartStatistic(productList);
      },
      error: (err: any) => console.log(err)
    }
    
    this.route.data.pipe(
        map(data => data['productList']),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(observer)
  }
}
