import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product-model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/producs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  phonesForSale: ProductModel[] = [];
  isCartOpen: boolean = false;
  isInfoOpen: boolean = false;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.initServices();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  trackByFn(index: number): number {
    return index;
  }

  onAddToCart(phone: ProductModel):void {
    this.cartService.addProductsToCart(phone);
    console.log(`This ${phone.name} was added to cart`);
  }

  onInfoBtnClick():void {
    this.isInfoOpen = !this.isInfoOpen
  }

  private initServices(): void {
    this.setIsCartOpen();
    this.getPhones();
  }

  private setIsCartOpen(): void {
    this.cartService.isCartOpen$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      value => {
        this.isCartOpen = value
      }
    )
  }

  private getPhones(): void {
    this.phonesForSale = this.productsService.getProducts();
  }
}
