import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product-model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy{

  products: ProductModel[] = [];
  isCartOpen: boolean = false;
  cartBtnStatus!: string;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initServices();
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

  private initServices(): void {
    this.setIsCartOpen();
    this.getProducts();
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
    this.products = this.cartService.getCartsProducts();
  }

  private setCartStatus(): void {
    this.isCartOpen ?
    this.cartBtnStatus = 'Close':
    this.cartBtnStatus = 'Open';
  }
}