import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common'

import {ProductModel} from 'src/app/shared/models/product.model';
import {ProductsService} from "../../services/producs.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() phone!: ProductModel;
  @Input() isDetailView!: boolean;

  @Output() incrementPhoneInCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() decrementPhoneInCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() removePhoneFromCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();


  @Output() sendPhoneToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() openProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  totalCount!: number;
  productId!: number;
  isInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private location: Location,
    private cartService: CartService
    ) {
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.getProductById();
    this.isInCart = this.isProductInCart();
  }

  ngDoCheck(): void {
    this.totalCount = this.getTotalCount(this.phone);
    this.isDetailView = false;
  }

  addToCart(phone: ProductModel): void {
    this.sendPhoneToCart.emit(phone);
    this.cartService.addProductsToCart(phone);
  }

  getProductDetail(phone: ProductModel) {
    this.openProduct.emit(phone)
  }

  onBack(): void {
    this.location.back();
  }

  incrementPhone(phone: ProductModel): void {
    this.incrementPhoneInCart.emit(phone);
  }

  decrementPhone(phone: ProductModel): void {
    this.decrementPhoneInCart.emit(phone);
  }

  removeFromCart(phone: ProductModel): void {
    this.removePhoneFromCart.emit(phone);
  }

  private isProductInCart():boolean {
    return this.router.url.includes('cart')
  }

  private getTotalCount(phone: ProductModel): number{
    const {price, phoneInCart} = phone;
    return phoneInCart? price*phoneInCart : 0;
  }

  private getProductById(): void {
    if(this.productId) {
      this.phone = this.productsService.getProduct(this.productId);
      this.isDetailView = true;
    }
  }
}
