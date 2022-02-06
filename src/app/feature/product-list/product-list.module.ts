import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ProductListComponent],
  imports: [
    SharedModule,
  ]
})
export class ProductListModule { }
