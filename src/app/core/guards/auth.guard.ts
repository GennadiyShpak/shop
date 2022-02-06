import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {RouteConfig} from "../../shared/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRLogin();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.checkRLogin();
  }

  private checkRLogin(): boolean | UrlTree {
    if(this.authService.isLogIn) {
      return true;
    }
    return this.router.parseUrl(`/${RouteConfig.loginPage}`);
  }
}
