import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouteConfig} from "../../../shared/models";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  routeLinks!: Record<string, string>
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.routeLinks = {...this.getLinks()};
  }

  onLogOut(): void {
    this.authService.logOut();
  }

  private getLinks(): Record<string, string> {
    return {
      productLink: `/${RouteConfig.productsPage}`,
      cartLink: `/${RouteConfig.cartPage}`,
      adminLink: `/${RouteConfig.adminPage}`
    }
  }
}
