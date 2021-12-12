import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProducsService } from 'src/app/core/services/producs.service';
import { ProductModel } from '../../core/models/product-model';

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
