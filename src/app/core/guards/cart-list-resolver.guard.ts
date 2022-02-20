import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import type { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY, catchError, take, switchMap } from 'rxjs';

import {ProductModel, RouteConfig} from "../../shared/models";
import { CartObservableService } from '../services/cart-observable.service';

@Injectable({
  providedIn: 'any'
})

export class CartResolveGuard implements Resolve<ProductModel[]> {

  constructor(
    private router: Router,
    private cartObservableService: CartObservableService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel[]> {
    return this.cartObservableService.getProducts().pipe(
      switchMap((productList: ProductModel[]) => {
        if (productList) {
          return of(productList);
        } else {
          this.router.navigate([`/${RouteConfig.productsPage}`]);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate([`/${RouteConfig.productsPage}`]);
        return EMPTY;
      })
    );
  }
}
