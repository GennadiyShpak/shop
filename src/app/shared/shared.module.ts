import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { HighlightingDirective } from './directives/highlighting.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import {FormsModule} from "@angular/forms";
import {AppInfoComponent, NotFoundComponent} from "./components";



@NgModule({
  declarations: [
    ProductComponent,
    HighlightingDirective,
    BackgroundColorDirective,
    AppInfoComponent,
    OrderByPipe,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductComponent,
    HighlightingDirective,
    AppInfoComponent,
    OrderByPipe,
    CommonModule,
    FormsModule,
    NotFoundComponent
  ],
})
export class SharedModule { }
