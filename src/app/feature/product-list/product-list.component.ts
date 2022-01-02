import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product-model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProducsService } from 'src/app/shared/services/producs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  phonesForSale: ProductModel[] = [];
  isCartOpen: boolean = false;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private producsService: ProducsService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.initServices();
  }

  trackByFn(index: number): number {
    return index;
  }

  onAddToCart(phone: ProductModel):void {
    this.cartService.addProductsToCart(phone);
    console.log(`This ${phone.name} was added to cart`);
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
    this.phonesForSale = this.producsService.getProducts();
  }
}
