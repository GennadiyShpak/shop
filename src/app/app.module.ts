import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartListModule } from './feature/cart-list/cart-list.module';
import { ProductListModule } from './feature/product-list/product-list.module';
import { SharedModule } from './shared/shared.module';
import { CartItemModule } from './feature/cart-item/cart-item.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CartListModule,
    ProductListModule,
    SharedModule,
    CartItemModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
