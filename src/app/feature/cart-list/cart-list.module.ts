import { NgModule } from '@angular/core';
import { CartListComponent } from './cart-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {CartListRoutingModule} from "./cart-list-routing.module";



@NgModule({
  declarations: [CartListComponent],
  imports: [
    SharedModule,
    NgSelectModule,
    CartListRoutingModule
  ],
})
export class CartListModule { }
