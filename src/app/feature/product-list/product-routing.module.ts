import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from "./product-list.component";
import {RouteConfig} from "../../shared/models";

const routes: Routes = [
  {
    path: RouteConfig.productsPage,
    component: ProductListComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
