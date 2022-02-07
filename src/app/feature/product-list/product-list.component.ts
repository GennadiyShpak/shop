import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/producs.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  phonesForSale!: Observable<ProductModel[]>;
  isInfoOpen: boolean = false;
  pageUrl!: string;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
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

  onInfoBtnClick():void {
    this.isInfoOpen = !this.isInfoOpen
  }

  onOpenProduct(phone: ProductModel):void {
    const link = [this.router.url, phone.id];
    this.router.navigate(link);
  }

  private initServices(): void {
    this.getPhones();
  }

  private getPhones(): void {
    this.phonesForSale = this.productsService.getProducts();
  }
}
