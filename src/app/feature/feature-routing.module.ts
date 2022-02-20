import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {RouteConfig} from "../shared/models";
import {FeatureComponent} from "./feature.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductComponent} from "../shared/components/product/product.component";
import {AdminGuard} from "../core/guards/admin.guard";
import {CheckCartGuard} from "./process-order";
import {adminRouting} from "./admin/admin-routing.config";
import {AdminFormComponent} from "./admin/admin-form/admin-form.component";
import {AdminResolveGuard} from "../core/guards/adnin-resolver.guard";
import {CanDeactivateGuard} from "../core/guards/can-deactivate.guard";
import { CartResolveGuard } from '../core/guards/cart-list-resolver.guard';


const routes: Routes = [
  {
    path: RouteConfig.loginPage,
    component: LoginComponent
  },
  {
    path: '',
    component: FeatureComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteConfig.productsPage,
        component: ProductListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RouteConfig.cartPage,
        loadChildren: () => import('./cart-list/cart-list.module').then(m => m.CartListModule),
        canActivate: [AuthGuard],
        resolve: {
          productList: CartResolveGuard
        }
      },
      {
        path: RouteConfig.order,
        loadChildren: () => import('./process-order/process-order.module').then(m => m.ProcessOrderModule),
        canLoad: [CheckCartGuard]
      },
      {
        path: `${RouteConfig.productsPage}/:productId`,
        component: ProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: `${RouteConfig.cartPage}/:productId`,
        component: ProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: RouteConfig.adminPage,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: `${adminRouting.edit}/:productId`,
        component: AdminFormComponent,
        resolve: {
          product: AdminResolveGuard,
        },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
