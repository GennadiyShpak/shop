import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartItemModule } from '../cart-item/cart-item.module';



@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CartItemModule,
  ],
  exports: [CartListComponent]
})
export class CartListModule { }
