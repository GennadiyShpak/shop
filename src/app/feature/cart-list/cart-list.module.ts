import { NgModule } from '@angular/core';
import { CartListComponent } from './cart-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartItemModule } from '../cart-item/cart-item.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [CartListComponent],
  imports: [
    SharedModule,
    CartItemModule,
    NgSelectModule,
  ],
  exports: [CartListComponent]
})
export class CartListModule { }
