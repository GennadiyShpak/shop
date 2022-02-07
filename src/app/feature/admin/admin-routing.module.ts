import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {adminRouting} from "./admin-routing.config";
import {AdminProductsComponent} from "./admin-products/admin-products.component";
import {AdminOrderComponent} from "./admin-order/admin-order.component";
import {AdminFormComponent} from "./admin-form/admin-form.component";
import {CanDeactivateGuard} from "../../core/guards/can-deactivate.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: adminRouting.products,
            component: AdminProductsComponent
          },
          {
            path: adminRouting.order,
            component: AdminOrderComponent
          },
          {
            path: adminRouting.add,
            component: AdminFormComponent,
            canDeactivate: [CanDeactivateGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
