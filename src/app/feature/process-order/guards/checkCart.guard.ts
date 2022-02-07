import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from "../../../shared/services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class CheckCartGuard implements CanLoad {

  constructor(private cartService: CartService) {
  }

  canLoad(route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
    if(this.cartService.isCartEmpty()) {
      return false;
    }
    return true;
  }
}
