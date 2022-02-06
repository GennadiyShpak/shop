import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "./admin.component";
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import {AdminOrderComponent} from "./admin-order/admin-order.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavBarComponent,
    AdminProductsComponent,
    AdminFormComponent,
    AdminOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ]
})

export class AdminModule { }
