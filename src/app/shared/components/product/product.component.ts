import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common'

import {ProductModel} from 'src/app/shared/models/product.model';
import { ProductsPromiseService } from 'src/app/core/services/products-promise.service';
import { CartObservableService } from 'src/app/core/services/cart-observable.service';
import { RouteConfig } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() phone!: ProductModel;
  @Input() isDetailView!: boolean;

  @Output() incrementPhoneCount: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() decrementPhoneCount: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  @Output() sendPhoneToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() openProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  totalCount!: number;
  productId!: number;
  isInCart: boolean = false;
  phone$!: Promise<ProductModel>;
  canDecrementPhoneCount: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productsPromiseService: ProductsPromiseService,
    private cartObservableService: CartObservableService,
    private cdr: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.getProductById(this.productId);
    this.isInCart = this.isProductInCart();
    this.changeDecrementBtnStatus();
  }

  ngDoCheck(): void {
    this.totalCount = this.getTotalCount(this.phone);
    this.isDetailView = false;
  }

  addToCart(phone: ProductModel): void {
      phone = {...phone, phoneInCart: 1}
      this.sendPhoneToCart.emit(phone);
      this.cartObservableService.addProductToCart(phone).subscribe();
      this.router.navigate([RouteConfig.productsPage]);
  }

  getProductDetail(phone: ProductModel) {
    this.openProduct.emit(phone)
  }

  onBack(): void {
    this.location.back();
  }

  incrementPhone(phone: ProductModel): void {
    this.cartObservableService.incrementProductInCart(phone).subscribe((phone) => {
      this.canDecrementPhoneCount = true;
      this.phone = phone;
      this.cdr.detectChanges();
    });
    this.incrementPhoneCount.emit()
  }

  decrementPhone(phone: ProductModel): void {
    this.cartObservableService.decrementProductInCart(phone).subscribe((phone) => {
      if(phone.phoneInCart > 1) {
        this.canDecrementPhoneCount = true
      } else {
        this.canDecrementPhoneCount = false
      }
      this.phone = phone;
      this.cdr.detectChanges();
    });
  }

  removeFromCart(phone: ProductModel): void {
    this.cartObservableService.removeProductFromCart(phone).subscribe();
    this.router.navigate([RouteConfig.cartPage])
  }

  private isProductInCart():boolean {
    return this.router.url.includes('cart')
  }

  private getTotalCount(phone: ProductModel): number{
    if (!phone) {
      return 0;
    }
    const {price, phoneInCart} = phone;
    return  price*phoneInCart!
  }

  private changeDecrementBtnStatus(): void {
    if(this.phone?.phoneInCart > 1) {
      this.canDecrementPhoneCount = true
    }
  }

  private getProductById(id: number): void {
    if(this.productId) {
      this.productsPromiseService.getProduct(id)
      .then(phone => {
        this.phone = phone
      });
      this.isDetailView = true;
    }
  }

  get isCartInCart() {
    return this.phone && Boolean(this.phone.phoneInCart)
  }

  get addButtonTitle() {
    return this.isCartInCart? 'Phone already in cart' : 'Add to cart'
  }
}
