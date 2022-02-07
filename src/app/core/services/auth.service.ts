import { Injectable } from '@angular/core';
import {RouteConfig, UserRole} from "../../shared/models";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role!: UserRole;
  private isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  logIn(role: UserRole): void {
    if(role) {
      this.isLoggedIn  = true;
      this.role = role;
      this.isAdmin
        ? this.router.navigate([`/${RouteConfig.adminPage}`])
        : this.router.navigate([`/${RouteConfig.productsPage}`])
    }
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.router.navigate([`/${RouteConfig.loginPage}`])
  }

  get isAdmin() {
    return this.role === UserRole.admin
  }

  get isLogIn () {
    return this.isLoggedIn;
  }
}
