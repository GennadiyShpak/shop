import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ProductModel} from "../../../shared/models";
import {ProductsService} from "../../../shared/services/producs.service";
import {Router} from "@angular/router";
import {adminRouting} from "../admin-routing.config";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products!: Observable<ProductModel[]>;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onProduct(product: ProductModel): void {
    const link = [adminRouting.edit, product.id];
    this.router.navigate(link);
  }
}
