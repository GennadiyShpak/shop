import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import type { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY, catchError, take, switchMap } from 'rxjs';

import {ProductModel, RouteConfig} from "../../shared/models";
import {ProductsService} from "../../shared/services/producs.service";

@Injectable({
  providedIn: 'any'
})

export class AdminResolveGuard implements Resolve<ProductModel> {

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel> {
    if (!route.paramMap.has('productId')) {
      console.log(1)
      return of({
        id: 0,
        price: 0,
        image: '',
        isAvailable: false,
        name: ''
      });
    }

    const id = +route.paramMap.get('productId')!;


    return this.productsService.getProduct$(id).pipe(
      switchMap((product: ProductModel) => {
        if (product) {
          return of(product);
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
