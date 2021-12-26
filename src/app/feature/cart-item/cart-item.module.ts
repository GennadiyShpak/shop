import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CartItemComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[CartItemComponent]
})
export class CartItemModule { }
